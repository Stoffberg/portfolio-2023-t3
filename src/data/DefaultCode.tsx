const DefaultCode = `
import { useEffect, useMemo, useRef, useState } from "react";
import { Document, Page } from "react-pdf";
import { trpc } from "../utils/trpc";

import { pdfjs } from "react-pdf";
import { DocumentTag, Element, ElementTag, File, User } from "@prisma/client";
import { Combobox, Disclosure, Switch, Transition } from "@headlessui/react";
import axios from "axios";
import { DraggableData, Rnd } from "react-rnd";
import { useSession } from "next-auth/react";
import { File as FileIcon, FileDoc, FileImage, FilePdf, FileZip, MicrosoftWordLogo, Plus, X } from "phosphor-react";
import { useRouter } from "next/router";

const TableIcons = {
    PDF: <FilePdf className="w-5 h-5" />,
    WORD: <MicrosoftWordLogo className="w-5 h-5" />,
    DOC: <FileDoc className="w-5 h-5" />,
    ZIP: <FileZip className="w-5 h-5" />,
    IMG: <FileImage className="w-5 h-5" />,
    FILE: <FileIcon className="w-5 h-5" />,
};

// type is anything from application/pdf to application/zip
const getIcon = (type: string) => {
    if (type.includes("pdf")) return TableIcons.PDF;
    if (type.includes("doc")) return TableIcons.WORD;
    if (type.includes("text")) return TableIcons.DOC;
    if (type.includes("zip")) return TableIcons.ZIP;
    if (type.includes("image")) return TableIcons.IMG;
    return TableIcons.FILE;
};

pdfjs.GlobalWorkerOptions.workerSrc = \`//unpkg.com/pdfjs-dist@\${pdfjs.version}/build/pdf.worker.min.js\`;

type PageElement = Omit<Element, "creatorId" | "createdAt" | "updatedAt"> & { files: File[]; tags: ElementTag[] };

const defaultPageElement: PageElement = {
    id: "",

    x: 0,
    y: 0,
    width: 18,
    height: 18,
    page: 0,

    documentId: "",
    title: "",
    description: "",
    amount: 0,

    payDate: new Date(),
    invoiceDate: new Date(),

    files: [],
    tags: [],
};

const PdfViewer = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data: session } = useSession({ required: true });
    const router = useRouter();
    const utils = trpc.useContext();

    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [elements, setElements] = useState<PageElement[]>([]);
    const [numPages, setNumPages] = useState<number>(0);

    const [file, setFile] = useState<string | null>(null);
    const [documentId, setDocumentId] = useState<string>("");

    const [networkProcess, setNetworkProcess] = useState(0);

    const [oldDocumentId, setOldDocumentId] = useState(documentId);
    useEffect(() => {
        if (!documentId || oldDocumentId === documentId) return;

        const fetchElements = async () => {
            setOldDocumentId(documentId);
            setElements([]);
            const elements = await utils.element.getElementsByDocumentId.fetch({ documentId });
            setElements(elements);
        };

        fetchElements();
    }, [documentId, oldDocumentId, utils.element.getElementsByDocumentId]);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        console.log("onDocumentLoadSuccess", numPages);
        setNumPages(numPages);
    };

    const generatePreviewsForPDF = trpc.file.generatePreviews.useMutation();
    const upsertDocument = trpc.document.upsertDocument.useMutation();
    const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        if (!file) return;

        // make a new blob from the file
        const blob = new Blob([file], { type: file.type });

        // convert the blob to a string
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
            const base64data = reader.result;
            if (typeof base64data !== "string") return;

            setFile(base64data);

            // upload the file to the server
            const document = await upsertDocument.mutateAsync({ title: file.name, description: "", tags: [] });
            const signedUrl = await utils.storage.putSignedUrl.fetch({ id: document.id, name: file.name, type: file.type });

            // upload the file to the storage with axios
            try {
                await axios.put(signedUrl.url, file, {
                    headers: {
                        "Content-Type": signedUrl.contentType,
                    },
                    onUploadProgress: (progressEvent) => {
                        setNetworkProcess((progressEvent.loaded * 100) / (progressEvent.total || 0));
                    },
                });
                setNetworkProcess(0);
            } catch (error) {
                console.log(error);
            }

            setDocumentId(document.id);

            await generatePreviewsForPDF.mutateAsync({ key: document.id + "." + file.type.split("/")[1], id: document.id });
            utils.document.getDocuments.invalidate();
        };
    };

    const { data: documents } = trpc.document.getDocuments.useQuery();
    const { data: sharedDocuments } = trpc.document.getSharedDocuments.useQuery();

    const upsertElement = trpc.element.upsertElement.useMutation();
    const upsertFile = trpc.file.upsertFile.useMutation();

    const handlePageClick = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>, pageNumber: number) => {
        if (e.target !== e.currentTarget) return;

        const { x, y } = {
            x: e.clientX - (e.target as HTMLDivElement).getBoundingClientRect().x - 9,
            y: e.clientY - (e.target as HTMLDivElement).getBoundingClientRect().y - 9,
        };
        const pageElement: PageElement = { ...defaultPageElement, page: pageNumber, documentId, x, y };
        setElements((prev) => [...prev, pageElement]);
        disclosureControl.current?.click();

        const content = { ...pageElement, files: [], tags: [] };
        const position = { x, y, width: 18, height: 18, page: pageNumber };
        const element = await upsertElement.mutateAsync({ documentId, content, position });

        setElements((prev) => prev.map((e) => (e.id === pageElement.id ? { ...e, id: element.id } : e)));
        setSelectedElementId(element.id);
    };

    const selectedElement = useMemo(() => elements.find((e) => e.id === selectedElementId), [elements, selectedElementId]);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!selectedElement) return console.error("No selected element");
        // make an array from the files as { name, data: string } objects
        const rawFile = e.target.files?.[0];
        if (!rawFile) return console.error("No file selected");

        // convert the raw file to a base64string
        const reader = new FileReader();
        reader.readAsDataURL(rawFile);
        reader.onload = async () => {
            const uploadedFile = await upsertFile.mutateAsync({ name: rawFile.name, elements: [selectedElement.id], type: rawFile.type });
            const signedUrl = await utils.storage.putSignedUrl.fetch({ id: uploadedFile.id, type: rawFile.type, name: rawFile.name });

            try {
                await axios.put(signedUrl.url, rawFile, {
                    headers: {
                        "Content-Type": signedUrl.contentType,
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 0));
                        setNetworkProcess(percentCompleted);
                    },
                });
                setNetworkProcess(0);
            } catch (error) {
                console.error(error);
            }

            const newElement = { ...selectedElement, files: [...selectedElement.files, uploadedFile] };
            setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
        };
    };

    const handleDownloadFile = async (file: File) => {
        const link = await utils.storage.getSignedUrl.fetch({ key: file.id + "." + file.type.split("/")[1] });
        const rawFile = await axios.get(link.url, {
            responseType: "blob",
            onDownloadProgress: (progressEvent) => setNetworkProcess((progressEvent.loaded / (progressEvent.total || 0)) * 100),
        });
        setNetworkProcess(0);
        const url = window.URL.createObjectURL(new Blob([rawFile.data]));
        const link2 = document.createElement("a");
        link2.href = url;
        link2.setAttribute("download", file.name);
        document.body.appendChild(link2);
        link2.click();
    };

    const disclosureControl = useRef<HTMLButtonElement>(null);

    const handleDragStop = async (d: DraggableData) => {
        const oldElement = elements.find((e) => e.id === selectedElementId);

        if (!oldElement) return console.error("No element found");

        const newElement = { ...oldElement, x: d.x, y: d.y };
        setElements((prev) => prev.map((e) => (e.id === selectedElementId ? { ...e, x: d.x, y: d.y } : e)));

        if (JSON.stringify(oldElement) === JSON.stringify(newElement)) return disclosureControl.current?.click();
        updateElement(newElement);
        setSelectedElementId(null);
    };

    const updateElement = async (element: PageElement) => {
        const content = { ...element, files: element.files.map((f) => f.id), tags: element.tags.map((t) => t.id) };
        const position = { x: element.x, y: element.y, width: element.width, height: element.height, page: element.page };
        upsertElement.mutateAsync({ id: content.id, documentId, content, position });
    };

    const deleteElement = trpc.element.deleteElement.useMutation();
    const handleDeleteElement = async () => {
        const element = elements.find((e) => e.id === selectedElementId);
        if (!element) return console.error("No element found");

        setElements((prev) => prev.filter((e) => e.id !== selectedElementId));
        setSelectedElementId(null);

        deleteElement.mutateAsync({ id: element.id });
    };

    const [flashingItemId, setFlashingItemId] = useState<string | null>(null);
    const pageRefs = useRef<Record<number, HTMLDivElement>>({});
    const mainScrollArea = useRef<HTMLDivElement>(null);
    const [flashingTimeout, setFlashingTimeout] = useState<NodeJS.Timeout | null>(null);
    const handleElementGoto = (elementId: string) => {
        if (flashingTimeout)
            setFlashingTimeout((prev) => {
                if (prev) clearTimeout(prev);
                return null;
            });

        if (flashingItemId === elementId) {
            if (viewList) setViewList(false);
            else {
                setFlashingItemId(null);
                setSelectedElementId(elementId);
                console.log("SHOULD OPEN?", disclosureControl.current);
                disclosureControl.current?.click();
            }
        }
        const element = elements.find((e) => e.id === elementId);
        if (!element) return console.error("No element found");

        mainScrollArea.current?.scrollTo({ top: pageRefs.current[element.page]?.offsetTop, behavior: "smooth" });
        setFlashingItemId(elementId);

        // after 2 seconds remove the flashing
        setFlashingTimeout(
            setTimeout(() => {
                setFlashingItemId(null);
                setFlashingTimeout(null);
            }, 2500)
        );
    };

    const { data: comments } = trpc.element.getCommentsByElementId.useQuery({ elementId: selectedElementId || "" }, { enabled: !!selectedElementId });
    const [comment, setComment] = useState("");
    const addComment = trpc.element.addComment.useMutation();

    const handleAddComment = async () => {
        if (!selectedElementId) return console.error("No element selected");
        if (!comment) return console.error("No comment");

        setComment("");

        const tempElement = {
            id: Math.random().toString(36),
            text: comment,
            createdAt: new Date(),
            creatorId: session?.user?.id || "",
            elementId: selectedElementId || "",
            creator: session?.user as User,
        };

        utils.element.getCommentsByElementId.setData({ elementId: selectedElementId || "" }, (prev) => [...(prev || []), tempElement]);

        const newComment = await addComment.mutateAsync({ elementId: selectedElementId, text: comment });
        utils.element.getCommentsByElementId.setData(
            {
                elementId: selectedElementId || "",
            },
            (prev) => (prev || []).map((c) => (c.id === tempElement.id ? newComment : c))
        );
    };

    const commentScrollArea = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!commentScrollArea.current || !comments?.length) return;
        commentScrollArea.current?.scrollTo({ top: commentScrollArea.current.scrollHeight, behavior: "smooth" });
    }, [comments]);

    const [userSearchQuery, setUserSearchQuery] = useState("");
    const { data: searchUsers } = trpc.user.getSearchUsers.useQuery({ query: userSearchQuery });

    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const shareDocument = trpc.user.updateShareDocument.useMutation();
    const handleShareDocument = async () => {
        if (!selectedUsers.length) return console.error("No users selected");

        const newUsers = selectedUsers.map((u) => u.id);

        const newDocument = await shareDocument.mutateAsync({ documentId, userIds: newUsers, shared: true });
        utils.document.getDocuments.setData(undefined, (prev) => (prev || []).map((d) => (d.id === newDocument.id ? newDocument : d)));
        setSelectedUsers([]);
    };

    const [viewList, setViewList] = useState(false);

    const [documentDetails, setDocumentDetails] = useState<NonNullable<typeof documents>[number] | null>(null);
    const handleDocumentQuerySet = (data: { id: string; title: string; description: string }) => {
        utils.document.getDocuments.setData(undefined, (prev) => (prev || []).map((d) => (d.id === data.id ? { ...d, ...data } : d)));
        utils.document.getSharedDocuments.setData(undefined, (prev) => (prev || []).map((d) => (d.id === data.id ? { ...d, ...data } : d)));
    };

    const handleUpdateDocument = async (data: NonNullable<typeof documentDetails>) => {
        setDocumentDetails(data);

        handleDocumentQuerySet(data);
        await upsertDocument.mutateAsync({ ...data, tags: data.tags.map((t) => t.id) });
    };

    const [tagSearchQuery, setTagSearchQuery] = useState("");
    const { data: availableTags } = trpc.tag.getAvailableTags.useQuery({ query: tagSearchQuery });

    const [newTagLabel, setNewTagLabel] = useState("");
    const upsertTag = trpc.tag.upsertTag.useMutation();
    const handleTagCreate = async () => {
        if (!newTagLabel.length || !documentDetails) return console.error("No tag label included");

        setNewTagLabel("");

        const newTag = await upsertTag.mutateAsync({ id: "", label: newTagLabel, documentId: documentDetails.id });
        utils.tag.getAvailableTags.setData({ query: tagSearchQuery }, (prev) => [...(prev || []), newTag]);
    };

    const upsertElementTag = trpc.tag.upsertElementTag.useMutation();
    const handleElementTagCreate = async () => {
        if (!newElementTagLabel.length) return console.error("No tag label included");
        if (!selectedElement) return console.error("No element selected");

        setNewElementTagLabel("");

        const newTag = await upsertElementTag.mutateAsync({ label: newElementTagLabel, elementId: selectedElement.id });
        utils.tag.getAvailableTagsForElement.setData({ query: elementQuery }, (prev) => [...(prev || []), newTag]);
    };

    const deleteFile = trpc.file.delete.useMutation();
    const handleDeleteFile = async (file: NonNullable<typeof selectedElement>["files"][number]) => {
        if (!selectedElement) return console.error("No element selected");

        await deleteFile.mutateAsync({ id: file.id });
        setElements((prev) => prev?.map((e) => (e.id === selectedElement.id ? { ...e, files: e.files.filter((f) => f.id !== file.id) } : e)));
    };

    const [elementQuery, setElementQuery] = useState("");
    const [newElementTagLabel, setNewElementTagLabel] = useState("");
    const { data: elementTagOptions } = trpc.tag.getAvailableTagsForElement.useQuery({ query: elementQuery });

    const handleUpdateElement = async (data: PageElement) => {
        if (!selectedElement) return console.error("No element selected");

        setElements((prev) => prev?.map((e) => (e.id === selectedElement.id ? { ...e, ...data } : e)));
        await updateElement(data);
    };

    const [generatingPreviews, setGeneratingPreviews] = useState(false);
    const createFilePagePreview = trpc.file.createPreview.useMutation();
    const handleGeneratePreviews = async () => {
        if (!documentDetails) return console.error("No document selected");

        setGeneratingPreviews(true);
        const result = await generatePreviewsForPDF.mutateAsync({ key: documentDetails.id + ".pdf", id: documentDetails.id });

        const pdfFile = await pdfjs.getDocument(result).promise;

        const numPages = pdfFile.numPages;
        const previews: { viewport: pdfjs.PageViewport; data: Buffer }[] = [];
        for (let i = 1; i <= numPages; i++) {
            const page = await pdfFile.getPage(i);
            const viewport = page.getViewport({ scale: 2 });
            viewport.width = Math.floor(viewport.width);
            viewport.height = Math.floor(viewport.height);
            // create a new canvas element
            const canvas = document.createElement("canvas");
            canvas.width = viewport.width;
            canvas.height = viewport.height;
            const ctx = canvas.getContext("2d");
            if (!ctx) return console.error("No canvas context");

            const renderContext = {
                canvasContext: ctx,
                viewport,
            };

            await page.render(renderContext).promise;

            // export the canvas to a buffer of type image/png without using toBuffer
            const canvasBuffer = Buffer.from(canvas.toDataURL("image/png").replace(/^data:image\/\w+;base64,/, ""), "base64");

            // Add the preview to the array
            previews.push({ data: canvasBuffer, viewport });
        }

        for (let i = 0; i < previews.length; i++) {
            const uploadImage = async (preview: typeof previews[number], index: number, retryTime: number) => {
                const res = await utils.storage.uploadImage.fetch({ metadata: {}, viewport: preview.viewport });

                const imageUrl = "https://imagedelivery.net/" + res.uploadUrl.split("/").slice(-2).join("/") + "/" + \`w=\${preview.viewport.width}\`;
                console.log(imageUrl);

                const formData = new FormData();
                // generate a new file blob from the dataURI in a server-side fashion
                //const file = new File([preview.data], document.title + "_page_" + previews.indexOf(preview) + ".png", { type: "image/png" });
                // transform the png buffer to a string to append it to the formData
                const blob = new Blob([preview.data], { type: "image/png" });
                formData.append("file", blob, document.title + "_page_" + previews.indexOf(preview) + ".png");

                console.log("Uploading image " + index + " to image delivery");
                const imageRes = await fetch(res.uploadUrl, {
                    method: "POST",
                    body: formData,
                });

                if (imageRes.status !== 200) {
                    console.log(\`Failed to upload image to image delivery retrying in \${retryTime} seconds\`);
                    await new Promise((resolve) => setTimeout(resolve, retryTime * 1000));
                    await uploadImage(preview, index, retryTime * 2);
                    return;
                }

                console.log("Creating DB preview for page" + index);
                await createFilePagePreview.mutateAsync({
                    id: documentDetails.id,
                    page: index,
                    imageUrl,
                    sizeX: preview.viewport.width,
                    sizeY: preview.viewport.height,
                });
            };

            const preview = previews[i];
            const index = i;

            if (!preview) return console.error("No preview found");

            await uploadImage(preview, index, 1);
        }

        setGeneratingPreviews(false);
        router.push(\`/viewer/\${documentDetails.id}\`);
    };

    return (
        <main className="absolute inset-0 h-full flex">
            <div className="fixed top-0 inset-0 bg-blue-500 h-1.5 z-10" style={{ width: \`\${networkProcess}%\` }} />

            <div className="h-full shrink-0 flex flex-col z-30 shadow-md ">
                <label className="bg-gray-500 hover:bg-gray-700 px-2 py-1 text-white font-medium rounded-md cursor-pointer m-4 text-center">
                    Upload
                    <input type="file" className="hidden" onChange={(e) => handleDocumentUpload(e)} />
                </label>

                <Disclosure>
                    <div className="grid grid-rows-2 h-full max-w-xs">
                        <div className="border-y p-2">
                            <span className="font-bold p-2">Your documents:</span>
                            <div className="flex flex-col gap-2 overflow-y-auto p-2">
                                {documents?.map((document) => (
                                    <Disclosure.Button
                                        key={document.id}
                                        className="px-2 py-1 font-medium rounded-md cursor-pointer border hover:shadow-md hover:bg-gray-100 shadow text-sm"
                                        onClick={() => setDocumentDetails(document)}
                                    >
                                        {document.title}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                        <div className="p-2">
                            <span className="font-bold p-2">Shared with you:</span>
                            <div className="flex flex-col gap-2 overflow-y-auto p-2">
                                {sharedDocuments?.map((document) => (
                                    <Disclosure.Button
                                        key={document.id}
                                        className="px-2 py-1 font-medium rounded-md cursor-pointer border hover:shadow-md hover:bg-gray-100 shadow text-sm"
                                        onClick={() => setDocumentDetails(document)}
                                    >
                                        {document.title}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {documentDetails && (
                        <Disclosure.Panel className="bg-black/50 flex justify-center items-center fixed inset-0 z-50">
                            <div className="p-4 bg-white rounded-md">
                                <div className="flex justify-between mb-2 gap-10">
                                    <div>
                                        <h1 className="text-2xl font-bold">Document Details</h1>
                                        <h3 className="text-sm text-gray-500">This is the detailed view of the document</h3>
                                    </div>
                                    <Disclosure.Button className="text-2xl font-bold p-1 hover:bg-gray-200 h-10 w-10 flex justify-center items-center rounded-md">
                                        <span> X </span>
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="title" className="font-bold text-gray-800">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={documentDetails?.title}
                                            onChange={(e) => handleUpdateDocument({ ...documentDetails, title: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="description" className="font-bold text-gray-800">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={documentDetails.description}
                                            onChange={(e) => handleUpdateDocument({ ...documentDetails, description: e.target.value })}
                                        />
                                    </div>
                                    <label htmlFor="tags" className="font-bold text-gray-800">
                                        Tags
                                    </label>
                                    {documentDetails.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-1">
                                            {documentDetails?.tags.map((tag) => (
                                                <button
                                                    key={"selected_" + tag.id}
                                                    className="text-center px-1 py-0.5 rounded-full bg-gray-200 border text-xs"
                                                    onClick={() =>
                                                        handleUpdateDocument({ ...documentDetails, tags: documentDetails.tags.filter((t) => t.id !== tag.id) })
                                                    }
                                                >
                                                    {tag.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                    <div className="relative grid grid-cols-2 gap-4">
                                        <div className="flex items-center relative">
                                            <input
                                                type="text"
                                                className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                                placeholder="Create Tag"
                                                value={newTagLabel}
                                                onChange={(e) => setNewTagLabel(e.target.value)}
                                            />
                                            <button
                                                className="flex justify-between items-center text-gray-700 hover:bg-gray-300 absolute right-2 h-max w-max p-1.5 cursor-pointer rounded-md"
                                                onClick={handleTagCreate}
                                                disabled={newTagLabel.length === 0}
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                        <Combobox
                                            value={documentDetails?.tags}
                                            onChange={(value) => handleUpdateDocument({ ...documentDetails, tags: value })}
                                            multiple
                                        >
                                            <Combobox.Input
                                                onChange={(event) => setTagSearchQuery(event.target.value)}
                                                className="border rounded-md shadow p-2  w-full focus:outline-none focus:border-gray-500"
                                            />

                                            <Combobox.Options className="absolute shadow inset-x-0 flex flex-col top-full">
                                                {availableTags
                                                    ?.filter((su) => !documentDetails.tags.some((u) => u.id === su.id))
                                                    .map((tag) => (
                                                        <Combobox.Option
                                                            key={tag.id}
                                                            value={tag}
                                                            className="hover:bg-gray-100 p-2 bg-white hover:shadow-md cursor-pointer"
                                                        >
                                                            {tag.label}
                                                        </Combobox.Option>
                                                    ))}
                                            </Combobox.Options>
                                        </Combobox>
                                    </div>
                                    <div className="flex justify-end gap-4">
                                        {documentDetails.previews.length > 0 && (
                                            <button
                                                className="px-2 py-1 font-medium rounded-md bg-amber-500 enabled:hover:bg-amber-700 text-white w-max disabled:animate-pulse"
                                                onClick={handleGeneratePreviews}
                                                disabled={generatingPreviews}
                                            >
                                                Regenerate Previews
                                            </button>
                                        )}
                                        <button
                                            className="px-2 py-1 font-medium rounded-md bg-blue-500 enabled:hover:bg-blue-700 text-white w-max disabled:animate-pulse"
                                            onClick={
                                                documentDetails.previews.length === 0
                                                    ? handleGeneratePreviews
                                                    : () => router.push("/viewer/" + documentDetails.id)
                                            }
                                            disabled={generatingPreviews}
                                        >
                                            {documentDetails.previews.length === 0 ? "Generate Previews" : "View Preview"}
                                        </button>
                                        <Disclosure.Button
                                            className="px-2 py-1 font-medium rounded-md bg-green-500 enabled:hover:bg-green-700 text-white w-max"
                                            onClick={async () => {
                                                if (!documentDetails?.id) return console.error("Document id not found");

                                                const signedUrl = await utils.storage.getSignedUrl.fetch({ key: documentDetails.id + ".pdf" });
                                                // fetch the url with axios and return a base64 string
                                                const response = await axios.get(signedUrl.url, {
                                                    responseType: "arraybuffer",
                                                    onDownloadProgress: (progressEvent) =>
                                                        setNetworkProcess((progressEvent.loaded / (progressEvent.total || 0)) * 100),
                                                });

                                                setNetworkProcess(0);

                                                const base64 = Buffer.from(response.data, "binary").toString("base64");
                                                setFile(\`data:application/pdf;base64,\${base64}\`);
                                                setDocumentId(documentDetails.id);
                                            }}
                                            disabled={generatingPreviews}
                                        >
                                            Open Document
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    )}
                </Disclosure>
            </div>

            <div ref={mainScrollArea} className="flex flex-col grow items-center p-8 bg-gray-100 overflow-y-auto">
                <Disclosure>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className={\`flex flex-col gap-6 \${viewList ? "hidden" : ""}\`}
                        options={{
                            cMapUrl: \`https://unpkg.com/pdfjs-dist@\${pdfjs.version}/cmaps/\`,
                            cMapPacked: true,
                            standardFontDataUrl: \`https://unpkg.com/pdfjs-dist@\${pdfjs.version}/standard_fonts\`,
                        }}
                    >
                        {Array.from({ length: numPages }, (_, index) => (
                            <div key={\`page_\${index + 1}\`} ref={(el) => (pageRefs.current[index] = el as HTMLDivElement)} className="shadow-md border relative">
                                <Page pageNumber={index + 1} renderAnnotationLayer={false} renderTextLayer={true} width={800} />
                                <div className="absolute inset-0 bg-none pointer-events-none" onClick={(e) => handlePageClick(e, index)}>
                                    {elements.map((e, ei) => {
                                        if (e.page !== index) return null;

                                        return (
                                            <Rnd
                                                key={\`element_\${ei}\`}
                                                size={{ width: e.width, height: e.height }}
                                                position={{ x: e.x, y: e.y }}
                                                onDragStart={() => setSelectedElementId(e.id)}
                                                onDragStop={(e, d) => {
                                                    handleDragStop(d);
                                                }}
                                                enableResizing={false}
                                                disableDragging={!e.id}
                                                className={\`\${
                                                    flashingItemId === e.id
                                                        ? "animate-pulse bg-red-500"
                                                        : \`\${
                                                              e.title
                                                                  ? \`bg-green-500/50 \${e.id ? "hover:bg-green-700" : ""}\`
                                                                  : \`bg-blue-500/50 \${e.id ? "hover:bg-blue-700" : ""}\`
                                                          }\`
                                                }  rounded-full text-white font-bold relative pointer-events-auto\`}
                                            >
                                                <span className="pointer-events-none select-none text-xs absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                                    {ei + 1}
                                                </span>
                                            </Rnd>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </Document>
                    <Disclosure.Panel className="fixed inset-0 bg-black/50 flex items-center justify-center z-40" unmount={false}>
                        <div className="bg-white rounded-md shadow-md p-4">
                            <div className="flex justify-between mb-2 gap-10">
                                <div>
                                    <h1 className="text-2xl font-bold">Element Details</h1>
                                    <h3 className="text-sm text-gray-500">This is the detailed view of the element</h3>
                                </div>
                                <Disclosure.Button className="text-2xl font-bold p-1 hover:bg-gray-200 h-10 w-10 flex justify-center items-center rounded-md">
                                    <span ref={disclosureControl}> X </span>
                                </Disclosure.Button>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="title" className="font-bold text-gray-800">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            id="title"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={selectedElement?.title ?? ""}
                                            onChange={(e) => {
                                                if (!selectedElement) return;
                                                const newElement = { ...selectedElement, title: e.target.value };
                                                setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
                                                updateElement(newElement);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="description" className="font-bold text-gray-800">
                                            Description
                                        </label>
                                        <textarea
                                            id="description"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={selectedElement?.description ?? ""}
                                            onChange={(e) => {
                                                if (!selectedElement) return;
                                                const newElement = { ...selectedElement, description: e.target.value };
                                                setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
                                                updateElement(newElement);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="amount" className="font-bold text-gray-800">
                                            Amount
                                        </label>
                                        <input
                                            type="number"
                                            id="amount"
                                            step="0.01"
                                            lang="en"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={selectedElement?.amount ?? 0}
                                            onChange={(e) => {
                                                if (!selectedElement) return;
                                                const newElement = { ...selectedElement, amount: Number(e.target.value) };
                                                setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
                                                updateElement(newElement);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="invoiceDate" className="font-bold text-gray-800">
                                            Invoice Date
                                        </label>
                                        <input
                                            type="date"
                                            id="invoiceDate"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={selectedElement?.invoiceDate.toISOString().split("T")[0] ?? ""}
                                            onChange={(e) => {
                                                if (!selectedElement) return;
                                                const newElement = { ...selectedElement, invoiceDate: new Date(e.target.value) };
                                                setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
                                                updateElement(newElement);
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="payDate" className="font-bold text-gray-800">
                                            Pay Date
                                        </label>
                                        <input
                                            type="date"
                                            id="payDate"
                                            className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                            value={selectedElement?.payDate.toISOString().split("T")[0] ?? ""}
                                            onChange={(e) => {
                                                if (!selectedElement) return;
                                                const newElement = { ...selectedElement, payDate: new Date(e.target.value) };
                                                setElements((prev) => prev.map((e) => (e.id === newElement.id ? newElement : e)));
                                                updateElement(newElement);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="files" className="font-bold text-gray-800">
                                            Files
                                        </label>
                                        <label className="border rounded-md shadow p-2 flex items-center gap-2 cursor-pointer hover:bg-gray-100">
                                            <input type="file" id="files" className="hidden" onChange={(e) => handleFileUpload(e)} />
                                            <span className="text-gray-500">Upload File</span>
                                        </label>
                                        {selectedElement?.files.map((f, fi) => (
                                            <div key={fi} className="flex items-center gap-2">
                                                <button
                                                    className="w-8 h-8 bg-gray-200 rounded-md flex justify-center items-center"
                                                    onClick={() => handleDownloadFile(f)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 text-gray-500"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                                <div className="flex-1">
                                                    <div className="text-sm font-bold text-gray-800" title={f.name}>
                                                        {f.name.length > 50 ? f.name.slice(0, 50) + "..." : f.name}
                                                    </div>
                                                </div>
                                                <button
                                                    className="w-8 h-8 bg-gray-200 rounded-md flex justify-center items-center hover:bg-gray-300"
                                                    onClick={() => handleDeleteFile(f)}
                                                >
                                                    <X className="w-4 h-4 text-gray-500" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                        {selectedElement && selectedElement.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {selectedElement.tags.map((tag) => (
                                                    <button
                                                        key={"selected_" + tag.id}
                                                        className="text-center px-1 py-0.5 rounded-full bg-gray-200 border text-xs"
                                                        onClick={() =>
                                                            handleUpdateElement({
                                                                ...selectedElement,
                                                                tags: selectedElement.tags.filter((t) => t.id !== tag.id),
                                                            })
                                                        }
                                                    >
                                                        {tag.label}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                        <div className="relative grid grid-cols-2 gap-4 my-2">
                                            <div className="flex items-center relative">
                                                <input
                                                    type="text"
                                                    className="border rounded-md shadow p-2 focus:outline-none focus:border-gray-500"
                                                    placeholder="Create Tag"
                                                    value={newElementTagLabel}
                                                    onChange={(e) => setNewElementTagLabel(e.target.value)}
                                                />
                                                <button
                                                    className="flex justify-between items-center text-gray-700 hover:bg-gray-300 absolute right-2 h-max w-max p-1.5 cursor-pointer rounded-md"
                                                    onClick={handleElementTagCreate}
                                                    disabled={newElementTagLabel.length === 0}
                                                >
                                                    <Plus className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <Combobox
                                                value={selectedElement?.tags}
                                                onChange={(value) => (selectedElement ? handleUpdateElement({ ...selectedElement, tags: value }) : null)}
                                                multiple
                                            >
                                                <Combobox.Input
                                                    onChange={(event) => setElementQuery(event.target.value)}
                                                    className="border rounded-md shadow p-2  w-full focus:outline-none focus:border-gray-500"
                                                />

                                                <Combobox.Options className="absolute shadow inset-x-0 flex flex-col top-full">
                                                    {elementTagOptions
                                                        ?.filter((su) => !selectedElement?.tags.some((u) => u.id === su.id))
                                                        .map((tag) => (
                                                            <Combobox.Option
                                                                key={tag.id}
                                                                value={tag}
                                                                className="hover:bg-gray-100 p-2 bg-white hover:shadow-md cursor-pointer"
                                                            >
                                                                {tag.label}
                                                            </Combobox.Option>
                                                        ))}
                                                </Combobox.Options>
                                            </Combobox>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <Disclosure.Button
                                                className="bg-red-500 text-white rounded-md px-2 py-1 font-medium hover:bg-red-700"
                                                onClick={() => handleDeleteElement()}
                                            >
                                                Delete
                                            </Disclosure.Button>
                                            <Disclosure.Button className="bg-green-500 text-white rounded-md px-2 py-1 font-medium hover:bg-green-700">
                                                Save
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 h-full">
                                    <div
                                        className="h-96 overflow-y-auto bg-gray-100 w-72 flex flex-col gap-y-1 rounded-md shadow-inner text-sm border"
                                        ref={commentScrollArea}
                                    >
                                        {comments?.map((comment) => (
                                            <div key={comment.id} className="border p-2 rounded-md bg-white m-1">
                                                <div className="flex justify-between">
                                                    <span className="text-xs font-medium">{comment.creator.name}</span>
                                                    <span className="text-xs">{comment.createdAt.getHours() + ":" + comment.createdAt.getMinutes()}</span>
                                                </div>
                                                <p className="">{comment.text}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <textarea
                                            className="border rounded-md shadow p-2 flex-1 focus:outline-none focus:border-gray-500"
                                            onChange={(e) => setComment((e.target as HTMLTextAreaElement).value)}
                                            value={comment}
                                            maxLength={60}
                                        />
                                        <div className="flex flex-col gap-2">
                                            <button
                                                className="bg-amber-500 text-white rounded-md px-2 py-1 font-medium hover:bg-amber-700 h-max"
                                                onClick={() => setComment("")}
                                            >
                                                Clear
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white rounded-md px-2 py-1 font-medium hover:bg-blue-700 h-max"
                                                onClick={() => handleAddComment()}
                                            >
                                                Send
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </Disclosure>
                <div className={\`rounded-xl overflow-y-auto w-full border-t border-x shadow-md \${viewList ? "" : "hidden"}\`}>
                    {/* a table that displays all the elements */}
                    <table className="w-full">
                        <thead>
                            <tr className="bg-white">
                                <th className="border-r border-b p-2">Index</th>
                                <th className="border-r border-b p-2">Title</th>
                                <th className="border-r border-b p-2">Amount</th>
                                <th className="border-r border-b p-2">Invoice Date</th>
                                <th className="border-r border-b p-2">Pay Date</th>
                                <th className="border-r border-b p-2">Files</th>
                            </tr>
                        </thead>
                        <tbody>
                            {elements.map((element, index) => (
                                <tr
                                    key={element.id}
                                    className={\`hover:bg-gray-100 bg-white \${
                                        flashingItemId === element.id ? "outline outline-1 outline-offset-[-1px] outline-gray-400" : ""
                                    }\`}
                                    onClick={() => handleElementGoto(element.id)}
                                >
                                    <td className="border-r border-b p-2">{index + 1}</td>
                                    <td className="border-r border-b p-2">{element.title}</td>
                                    <td className="border-r border-b p-2">{element.amount}</td>
                                    <td className="border-r border-b p-2">{element.invoiceDate.toLocaleDateString()}</td>
                                    <td className="border-r border-b p-2">{element.payDate.toLocaleDateString()}</td>
                                    <td className="border-r border-b p-2">
                                        {element.files.map((f) => {
                                            const icon = getIcon(f.type);
                                            return (
                                                <button
                                                    key={f.id}
                                                    className="p-1 hover:bg-gray-200 rounded w-max"
                                                    title={f.name}
                                                    onClick={() => handleDownloadFile(f)}
                                                >
                                                    {icon}
                                                </button>
                                            );
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={\`h-full shrink-0 inset-y-0 p-4 z-10 shadow-md max-w-xs\`}>
                <div className="grid grid-rows-1 h-full gap-14">
                    <div>
                        <h1 className="font-bold text-xl p-2">View Type:</h1>
                        <div className="flex justify-between items-center px-2 mb-4">
                            <span className="font-medium">{viewList ? "Detail table view" : "Document View"}</span>
                            <Switch
                                checked={viewList}
                                onChange={() => setViewList((prev) => !prev)}
                                className={\`\${viewList ? "bg-blue-600" : "bg-violet-600"} relative inline-flex h-6 w-16 items-center rounded-full\`}
                            >
                                <span className="sr-only">View List</span>
                                <span
                                    className={\`\${
                                        viewList ? "translate-x-11" : "translate-x-1"
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition\`}
                                />
                            </Switch>
                        </div>
                        <h1 className="font-bold text-xl p-2">Document Elements:</h1>
                        <div className="flex flex-col gap-2 overflow-y-auto h-5/6 p-2">
                            {elements?.map((element, index) => (
                                <button
                                    key={element.id}
                                    className="p-2 border rounded-md shadow hover:shadow-md hover:bg-gray-100 text-left"
                                    onClick={() => handleElementGoto(element.id)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h1 className="font-medium text-sm">{index + 1 + " - " + (element.title || "No Title")}</h1>
                                        <span className="text-xs">R{element.amount.toFixed(2)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{element.description || "No Description"}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                    <Disclosure>
                        <Disclosure.Button
                            className="bg-blue-500 text-white rounded-md px-2 py-1 font-medium enabled:hover:bg-blue-700 disabled:opacity-50"
                            disabled={!documentId}
                        >
                            Share
                        </Disclosure.Button>
                        <Disclosure.Panel className="fixed inset-0 bg-black/50 z-20 flex items-center justify-center">
                            <div className="p-4 bg-white rounded-md">
                                <div className="flex justify-between items-center gap-10">
                                    <div>
                                        <h1 className="text-2xl font-bold">Share Document</h1>
                                        <h3 className="text-sm text-gray-500">Search for the people you want to share with</h3>
                                    </div>
                                    <Disclosure.Button className="text-2xl font-bold p-1 hover:bg-gray-200 h-10 w-10 flex justify-center items-center rounded-md">
                                        X
                                    </Disclosure.Button>
                                </div>
                                <div className="relative">
                                    <Combobox value={selectedUsers} onChange={(value) => setSelectedUsers(value as User[])} multiple>
                                        <Combobox.Input
                                            onChange={(event) => setUserSearchQuery(event.target.value)}
                                            className="border rounded-md shadow p-2 mt-4 w-full focus:outline-none focus:border-gray-500"
                                        />

                                        <Combobox.Options className="absolute shadow inset-x-0 flex flex-col">
                                            {searchUsers
                                                ?.filter((su) => !selectedUsers.some((u) => u.id === su.id) && su.id !== session?.user?.id)
                                                .map((person) => (
                                                    <Combobox.Option
                                                        key={person.id}
                                                        value={person}
                                                        className="hover:bg-gray-100 p-2 bg-white hover:shadow-md cursor-pointer"
                                                    >
                                                        {person.name}
                                                    </Combobox.Option>
                                                ))}
                                        </Combobox.Options>
                                    </Combobox>
                                </div>
                                <div className="flex flex-col gap-2 my-2">
                                    {selectedUsers?.map((user) => (
                                        <div key={user.id} className="flex justify-between items-center px-2 py-1 border rounded-md shadow">
                                            <h1 className="font-medium">{user.name}</h1>
                                            <button
                                                className="text-red-500 hover:text-red-700 font-bold"
                                                onClick={() => setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id))}
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex justify-end">
                                    <Disclosure.Button
                                        className="bg-green-500 text-white rounded-md px-2 py-1 font-medium enabled:hover:bg-green-700"
                                        onClick={() => handleShareDocument()}
                                    >
                                        Share
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </Disclosure>
                </div>
            </div>
        </main>
    );
};

export default PdfViewer;
`;

export default DefaultCode;
