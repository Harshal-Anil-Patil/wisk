import { html, css, LitElement } from "/a7/cdn/lit-core-2.7.4.min.js";

class ToolbarElement extends LitElement {
    static styles = css`
        * {
            box-sizing: border-box;
            font-family: var(--font);
            margin: 0;
            padding: 0;
            transition: none;
        }

        :host {
            --dialog-margin-top--dont-mess-with-this: 40px;
        }

        .toolbar {
            position: fixed;
            background: var(--bg-1);
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            filter: var(--drop-shadow);
            padding: var(--padding-2);
            gap: var(--gap-2);
            z-index: 99;
            display: none;
            width: max-content;
        }

        .toolbar.visible {
            display: flex;
        }

        .toolbar button {
            background: var(--bg-1);
            border: none;
            width: 28px;
            height: 26px;
            border-radius: 3px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-1);
            transition: background 0.2s ease-in-out;
            gap: var(--gap-1);
            opacity: 1;
        }
        .toolbar div button { 
            opacity: 0.8;
        }

        .toolbar button[data-wide] {
            padding: 2px 6px;
            width: auto;
        }

        .toolbar button:hover {
            background: var(--bg-3);
            opacity: 1;
        }

        .separator {
            background: var(--border-1);
            height: auto;
            width: 1px;
            opacity: 0.5;
        }

        img {
            filter: var(--themed-svg);
            height: 18px;
        }

        .dialog-container {
            position: absolute;
            top: 100%;
            left: 0;
            margin-top: var(--dialog-margin-top--dont-mess-with-this, 40px);
            width: 100%;
            max-height: 500px;
            background: var(--bg-1);
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            filter: var(--drop-shadow);
            padding: var(--padding-3);
            display: flex;
        }

        .dialog {
            z-index: 1001;
            width: 100%;
            min-width: 200px;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        .dialog-buttons {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
            margin-top: 8px;
        }

        .dialog button {
            padding: 8px 16px;
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            cursor: pointer;
            color: var(--text-1);
            width: auto;
            height: auto;
        }

        .dialog button.cancel {
            background: var(--bg-1);
            border: none;
        }
        
        .ai-commands {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .ai-commands button {
            width: 100%;
            text-align: left;
            padding: 8px;
            background: var(--bg-1);
            justify-content: flex-start;
        }

        .source-item {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            border-bottom: 1px solid var(--border-1);
            padding: var(--padding-3) 0;
        }

        .source-item:last-child {
            border-bottom: none;
            margin-bottom: 8px;
        }

        .source-item h3 {
            font-size: 14px;
            margin-bottom: 4px;
        }

        .source-item p {
            font-size: 12px;
            color: var(--text-2);
            word-wrap: break-word;
            width: 100%;
        }

        .loading-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: var(--radius);
        }

        .loading-indicator {
            width: 24px;
            height: 24px;
            border: 2px solid var(--bg-3);
            border-top: 2px solid var(--text-1);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }

        .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 99;
        }

        .source-item * {
            margin: 0;
            padding: 0;
            word-wrap: break-word;
        }

        .url {
            color: var(--text-2);
            font-size: 12px;
        }

        *::-webkit-scrollbar {
            width: 15px;
        }
        *::-webkit-scrollbar-track {
            background: var(--bg-1);
        }
        *::-webkit-scrollbar-thumb {
            background-color: var(--bg-3);
            border-radius: 20px;
            border: 4px solid var(--bg-1);
        }

        .command-section {
            display: flex;
            flex-direction: column;
        }

        .command-section h3 {
            font-size: 11px;
            color: var(--text-2);
            margin-bottom: 4px;
            font-weight: 500;
        }

        .ai-input {
            width: 100%;
            padding: 8px;
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            background: var(--bg-1);
            color: var(--text-1);
            margin-bottom: 16px;
            flex: 1; width: auto; margin-bottom: 0; border: none; background-color: transparent;
        }

        .ai-commands button {
            display: flex;
            align-items: center;
            width: 100%;
            text-align: left;
            padding: var(--padding-2);
            background: var(--bg-1);
            border: none;
            border-radius: 4px;
            color: var(--text-1);
            font-size: 14px;
            cursor: pointer;
            transition: background 0.2s ease;
        }

        .ai-commands button:hover {
            background: var(--bg-2);
        }

        .submenu-container {
        }

        .submenu-container:hover .submenu {
            display: block;
        }

        .submenu {
            display: none;
            position: absolute;
            left: 100%;
            top: 0;
            background: var(--bg-1);
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            box-shadow: var(--drop-shadow);
            min-width: 150px;
            z-index: 1002;
            overflow: hidden;
        }

        .submenu button {
            padding: var(--padding-2) var(--padding-3);
            width: 100%;
            text-align: left;
            border: none;
            background: transparent;
            color: var(--text-1);
            cursor: pointer;
        }

        .submenu button:hover {
            background: var(--bg-2);
        }

        .submenu-trigger {
            position: relative;
        }

        .translate-menu {
            left: 90%;
            top: 20%;
        }

        .paraphrase-menu {
            left: 90%;
            top: 30%;
        }

        .tone-menu {
            left: 90%;
            top: 60%;
        }

        input {
            outline: none;
        }

        .preview-container {
            max-height: 300px;
            overflow-y: auto;
        }

        .preview-content {
            padding: var(--padding-3);
            border-radius: var(--radius);
            margin-bottom: var(--padding-3);
            white-space: pre-wrap;
            user-select: text;
        }

        .preview-buttons {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
        }

        .preview-buttons button {
            padding: 8px 16px;
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            cursor: pointer;
            color: var(--text-1);
        }

        .preview-buttons button.accept {
            background: var(--bg-2);
            border: 1px solid var(--border-1);
        }

        .preview-buttons button.accept:hover {
            background: var(--bg-3);
        }

        .preview-buttons button.discard {
            background: var(--bg-1);
            border: none;
        }
        .od {
            color: var(--text-1);
            background-color: var(--bg-2);
            border-radius: var(--radius);
            outline: none;
            border: 1px solid var(--bg-3);
            transition: all 0.2s ease;
            margin: 2px;
            display: flex;
            gap: var(--gap-1);
            align-items: center;
            flex-wrap: wrap;
            padding: var(--padding-1) var(--padding-3);
            margin-bottom: 16px;
        }
        .od:has(input:focus) {
            border-color: var(--border-2);
            background-color: var(--bg-1);
            box-shadow: 0 0 0 2px var(--bg-3);
        }
        .save {
            background: var(--bg-2);
            border: 1px solid var(--border-1);
            color: var(--text-1);
        }
        .save:hover {
            background: var(--bg-3);
        }

        .dialog-buttons button.save {
            background: var(--bg-2);
            border: 1px solid var(--border-1);
        }

        .color-menu {
            display: none;
            position: absolute;
            left: 100%;
            transform: translateX(-50%);
            top: 100%;
            background: var(--bg-1);
            border: 1px solid var(--border-1);
            border-radius: var(--radius);
            box-shadow: var(--drop-shadow);
            padding: var(--padding-3);
            z-index: 1002;
            width: 250px;
            margin-top: calc(var(--padding-2) * -1);
        }

        .submenu-container:hover .color-menu {
            display: block;
        }

        .color-section {
            margin-bottom: var(--padding-3);
        }

        .color-section:last-child {
            margin-bottom: 0;
        }

        .color-section h3 {
            font-size: 11px;
            text-transform: uppercase;
            color: var(--text-2);
            margin-bottom: 4px;
            font-weight: 500;
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: var(--gap-2);
        }

        .color-option {
            width: 30px;
            height: 30px;
            border-radius: var(--radius);
            border: 1px solid var(--border-1);
            cursor: pointer;
            transition: transform 0.2s;
            position: relative;
        }

        .color-option:hover {
            transform: scale(1.1);
        }

        .submenu-container:hover .color-submenu {
            display: block;
        }

    `;

    static properties = {
        mode: { type: String },
        dialogName: { type: String },
        selectedText: { type: String },
        elementId: { type: String },
        elementText: { type: String },
        visible: { type: Boolean },
        linkUrl: { type: String, state: true },
        sources: { type: Array },
        loading: { type: Boolean },
        previewText: { type: String },
        citations: { type: Array },
        showCitationsDialog: { type: Boolean }
    };

    constructor() {
        super();
        this.mode = "simple";
        this.dialogName = "";
        this.selectedText = "";
        this.elementId = "";
        this.elementText = "";
        this.visible = false;
        this.linkUrl = "";
        this.sources = [];
        this.loading = false;

        const editor = document.querySelector(".editor");
        if (editor) {
            editor.addEventListener("scroll", () => {
                this.updateToolbarPosition();
            });
            window.addEventListener("resize", () => {
                this.updateToolbarPosition();
            });
        }
        this.previewText = "";

        this.colorOptions = {
            red: { fg: 'var(--fg-red)', bg: 'var(--bg-red)', name: 'Red' },
            green: { fg: 'var(--fg-green)', bg: 'var(--bg-green)', name: 'Green' },
            blue: { fg: 'var(--fg-blue)', bg: 'var(--bg-blue)', name: 'Blue' },
            yellow: { fg: 'var(--fg-yellow)', bg: 'var(--bg-yellow)', name: 'Yellow' },
            purple: { fg: 'var(--fg-purple)', bg: 'var(--bg-purple)', name: 'Purple' },
            cyan: { fg: 'var(--fg-cyan)', bg: 'var(--bg-cyan)', name: 'Cyan' },
            orange: { fg: 'var(--fg-orange)', bg: 'var(--bg-orange)', name: 'Orange' },
            white: { fg: 'var(--text-1)', bg: 'var(--bg-1)', name: 'Default' },
            black: { fg: 'var(--fg-black)', bg: 'var(--bg-black)', name: 'Black' }
        };

        this.activeTextColor = 'var(--text-1)';
        this.activeBackgroundColor = 'var(--bg-1)';

        this.citations = [];
        this.showCitationsDialog = false;
    }

    async fetchCitations() {
        const citationsManager = document.querySelector('manage-citations');
        if (citationsManager) {
            this.citations = citationsManager.references;
            this.requestUpdate();
        }
    }

    handleInsertCitation(citation) {
        this.dispatchEvent(
            new CustomEvent("insert-citation", {
                detail: { 
                    elementId: this.elementId, 
                    citation: citation,
                    selectedText: this.selectedText
                },
                bubbles: true,
                composed: true,
            })
        );
        this.closeDialog();
    }

    updateToolbarPosition() {
        if (!this.visible || !this.elementId) return;

        const element = document.getElementById(this.elementId);
        if (!element?.getSelectionPosition) return;

        const position = element.getSelectionPosition();
        if (!position || !position.selectedText.trim()) {
            this.hideToolbar();
            return;
        }

        const toolbar = this.shadowRoot.querySelector(".toolbar");
        this.style.setProperty("--dialog-margin-top--dont-mess-with-this", `${(position.height > 200 ? 200 : position.height) + 20}px`);

        toolbar.style.left = `${Math.max(10, Math.min(position.x - toolbar.offsetWidth / 2, window.innerWidth - toolbar.offsetWidth - 10))}px`;
        toolbar.style.top = `${Math.max(10, position.y - 45)}px`;
    }

    async handleToolbarAction(action, operation) {
        switch (action) {

            case "subscript":
            case "superscript":
                this.dispatchEvent(
                    new CustomEvent("toolbar-action", {
                        detail: { action, elementId: this.elementId, selectedText: this.selectedText },
                        bubbles: true,
                        composed: true,
                    })
                );
                break;
            case "text-color":
                this.activeTextColor = value;
                this.dispatchEvent(
                    new CustomEvent("toolbar-action", {
                        detail: { 
                            action: 'foreColor', 
                            elementId: this.elementId, 
                            selectedText: this.selectedText,
                            formatValue: value
                        },
                        bubbles: true,
                        composed: true,
                    })
                );
                break;

            case "show-citations":
                this.mode = "dialog";
                this.dialogName = "citations";
                this.fetchCitations();
                break;

            case "background-color":
                this.activeBackgroundColor = value;
                this.dispatchEvent(
                    new CustomEvent("toolbar-action", {
                        detail: { 
                            action: 'backColor', 
                            elementId: this.elementId, 
                            selectedText: this.selectedText,
                            formatValue: value
                        },
                        bubbles: true,
                        composed: true,
                    })
                );
                break;
            case "link":
                this.mode = "dialog";
                this.dialogName = "link";
                break;
            case "ai-improve":
                this.mode = "dialog";
                this.dialogName = "ai-chat";
                break;
            case "find-source":
                this.mode = "dialog";
                this.dialogName = "sources";
                this.fetchSources();
                break;
            case "make-longer":
            case "make-shorter":
            case "fix-spelling-grammar":
            case "improve-writing":
            case "summarize":
                await this.handleAIOperation(action);
                break;
            case "ai-operation":
                await this.handleAIOperation(operation);
                break;

            case "ai-submenu":
                // Handle submenu operations (translate/tone)
                if (operation === "translate") {
                    // Handle translate submenu
                    console.log("Show translate submenu");
                } else if (operation === "tone") {
                    // Handle tone submenu
                    console.log("Show tone submenu");
                }
                break;

            case "ai-custom":
                await this.handleAIOperation(operation);
                break;
            default:
                this.dispatchEvent(
                    new CustomEvent("toolbar-action", {
                        detail: { action, elementId: this.elementId, selectedText: this.selectedText },
                        bubbles: true,
                        composed: true,
                    }),
                );
        }
    }

    handleLinkKeyDown(e) {
        if (e.key === "Enter") {
            e.preventDefault(); // Prevent newline insertion
            this.handleLinkSubmit(e);
        }
    }

    renderColorMenu() {
        return html`
            <div class="color-menu">
                <div class="color-section">
                    <h3>Text Color</h3>
                    <div class="color-grid">
                        ${Object.entries(this.colorOptions).map(([key, color]) => html`
                            <div
                                class="color-option ${color.fg === this.activeTextColor ? 'active' : ''}"
                                    style="background-color: ${color.fg}"
                                        @click=${() => this.dispatchEvent(
                                            new CustomEvent("toolbar-action", {
                                                detail: { 
                                                    action: 'foreColor', 
                                                    elementId: this.elementId, 
                                                    selectedText: this.selectedText,
                                                    formatValue: color.fg
                                                },
                                                bubbles: true,
                                                composed: true,
                                            })
                                        )}
                                            title="${color.name}"
                            ></div>
                        `)}
                    </div>
                </div>
                <div class="color-section">
                    <h3>Background Color</h3>
                    <div class="color-grid">
                        ${Object.entries(this.colorOptions).map(([key, color]) => html`
                            <div
                                class="color-option ${color.bg === this.activeBackgroundColor ? 'active' : ''}"
                                    style="background-color: ${color.bg}"
                                        @click=${() => this.dispatchEvent(
                                            new CustomEvent("toolbar-action", {
                                                detail: { 
                                                    action: 'backColor', 
                                                    elementId: this.elementId, 
                                                    selectedText: this.selectedText,
                                                    formatValue: color.bg
                                                },
                                                bubbles: true,
                                                composed: true,
                                            })
                                        )}
                                            title="${color.name}"
                            ></div>
                        `)}
                    </div>
                </div>
            </div>
        `;
    }

    async handleAIOperation(operation) {
        this.mode = "loading";

        this.requestUpdate();

        try {
            const auth = await document.getElementById("auth").getUserInfo();
            const response = await fetch("https://cloud.wisk.cc/v2/ai/ops", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
                body: JSON.stringify({
                    operation: operation,
                    content: this.selectedText,
                }),
            });

            if (response.ok) {
                const data = await response.text();

                // Instead of dispatching event, show preview
                this.previewText = data;
                this.mode = "preview";
                this.dialogName = "preview";
            } else {
                throw new Error("AI operation failed");
            }
        } catch (error) {
            console.error("AI operation error:", error);
            window.showToast("AI operation failed", 3000);
        } finally {
            this.loading = false;
            this.requestUpdate();
        }
    }

    handleAcceptPreview() {
        // Dispatch event with improved text
        this.dispatchEvent(
            new CustomEvent("ai-operation-complete", {
                detail: {
                    elementId: this.elementId,
                    newText: this.previewText,
                },
                bubbles: true,
                composed: true,
            }),
        );

        this.closeDialog();
    }

    handleDiscardPreview() {
        this.previewText = "";
        this.closeDialog();
    }


    async fetchSources() {
        this.mode = "loading";
        try {
            const auth = await document.getElementById("auth").getUserInfo();
            const response = await fetch("https://cloud.wisk.cc/v1/source", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + auth.token,
                },
                body: JSON.stringify({ ops: "find-source", selectedText: this.selectedText }),
            });

            if (response.ok) {
                const data = await response.json();
                this.sources = data.results;
                this.mode = "dialog";
                this.dialogName = "sources";
            } else {
                throw new Error("Failed to fetch sources");
            }
        } catch (error) {
            console.error("Error:", error);
            window.showToast("Failed to load sources", 3000);
            this.mode = "simple";
        }
    }

    handleLinkSubmit(e) {
        e?.preventDefault();

        let url = this.linkUrl;

        if (url.trim() === "") {
            window.showToast("URL is empty", 3000);
            return;
        }


        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        this.dispatchEvent(
            new CustomEvent("create-link", {
                detail: { url, elementId: this.elementId },
                bubbles: true,
                composed: true,
            }),
        );

        this.mode = "simple";
        this.linkUrl = "";
    }

    closeDialog() {
        this.mode = "simple";
        this.dialogName = "";
    }

    showToolbar(x, y, elementId, selectedText, elementText) {
        if (window.wisk.editor.wiskSite) {
            return;
        }

        this.selectedText = selectedText;
        this.elementId = elementId;
        this.elementText = elementText;
        this.visible = true;

        setTimeout(() => {
            this.updateToolbarPosition();
        }, 0);
    }

    hideToolbar() {
        this.visible = false;
        this.mode = "simple";
        this.dialogName = "";
    }

    async handleCreateReference(source) {
        event?.preventDefault();
        event?.stopPropagation();

        window.wisk.utils.showLoading("Adding source...");

        try {
            const user = await document.getElementById("auth").getUserInfo();
            const response = await fetch("https://cloud.wisk.cc/v1/source", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + user.token,
                },
                body: JSON.stringify({ ops: "get-url", url: source.url }),
            });

            if (!response.ok) {
                window.showToast("Failed to load sources", 3000);
                window.wisk.utils.hideLoading();
                return;
            }

            const data = (await response.json())[0];

            // Format the publish date properly
            const publishDate = data.publish_date ? new Date(data.publish_date).toISOString().split('T')[0] : "";

            // Create citation object with formatted date
            const citation = {
                id: "cite-" + Math.random().toString(36).substr(2, 9) + "-" + Date.now().toString(),
                title: source.title,
                authors: data.authors || [],
                publish_date: publishDate,
                journal_conference: data.meta_site_name || "",
                url: source.url,
                publisher_name: data.meta_site_name || "",
                doi: data.doi || "",
                volume: data.volume || "",
                issue: data.issue || "",
                pages: data.pages || "",
                publisher_location: data.publisher_location || "",
                language: data.language || "",
                summary: data.summary || "",
                content: data.text || ""
            };

            // Save selection before adding citation
            this.dispatchEvent(
                new CustomEvent("save-selection", {
                    detail: { elementId: this.elementId },
                    bubbles: true,
                    composed: true,
                })
            );

            const citationsManager = document.querySelector('manage-citations');
            if (!citationsManager) {
                window.showToast("Citations manager not found", 3000);
                window.wisk.utils.hideLoading();
                return;
            }

            citationsManager.addReference(citation);
            const inlineCitation = citationsManager.formatInlineCitation(citation);

            this.dispatchEvent(
                new CustomEvent("create-reference", {
                    detail: {
                        elementId: this.elementId,
                        citation: citation,
                        inlineCitation: inlineCitation
                    },
                    bubbles: true,
                    composed: true,
                })
            );

            this.closeDialog();
        } catch (error) {
            console.error('Error creating reference:', error);
            window.showToast("Failed to create reference", 3000);
        } finally {
            window.wisk.utils.hideLoading();
        }
    }


    render() {
        return html`
            ${this.mode === "dialog" || this.mode === "preview" ? html`<div class="backdrop" @click=${this.closeDialog}></div>` : ""}

            <div class="toolbar ${this.visible ? "visible" : ""}" style="">
                <button @click=${() => this.handleToolbarAction("ai-improve")} title="Improve with AI" data-wide>
                    <img src="/a7/forget/ai.svg" alt="AI" /> Neo AI
                </button>
                <div class="separator"></div>
                <button @click=${() => this.handleToolbarAction("find-source")} title="Find Source" data-wide>
                    <img src="/a7/forget/source.svg" alt="Source" /> Find Source
                </button>
                <button @click=${() => this.handleToolbarAction("show-citations")} title="Add Existing Citation" data-wide>
                    <img src="/a7/forget/plus.svg" alt="Citation" /> Add Citation
                </button>
                <div class="separator"></div>
                <div style="display: flex">
                    <button @click=${() => this.handleToolbarAction("bold")} title="Bold">
                        <img src="/a7/forget/bold.svg" alt="Bold" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("italic")} title="Italic">
                        <img src="/a7/forget/italics.svg" alt="Italic" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("underline")} title="Underline">
                        <img src="/a7/forget/underline.svg" alt="Underline" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("subscript")} title="Subscript">
                        <img src="/a7/plugins/toolbar/subscript.svg" alt="Subscript" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("superscript")} title="Superscript">
                        <img src="/a7/plugins/toolbar/superscript.svg" alt="Superscript" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("strikeThrough")} title="Strikethrough">
                        <img src="/a7/forget/strikethrough.svg" alt="Strikethrough" />
                    </button>
                    <button @click=${() => this.handleToolbarAction("link")} title="Add Link">
                        <img src="/a7/forget/link.svg" alt="Link" />
                    </button>
                    <div class="submenu-container">
                        <button class="submenu-trigger" title="Colors" style="width: auto; padding: 0 5px">
                            <img src="/a7/plugins/toolbar/color.svg" alt="Colors" />
                            <img src="/a7/plugins/toolbar/down.svg" alt="Colors" />
                        </button>
                        ${this.renderColorMenu()}
                    </div>
                </div>

                ${this.mode === "loading" ? html` <div class="loading-overlay"> <div class="loading-indicator"></div> </div> ` : ""}

                ${
                    this.mode === "dialog" || this.mode === "preview" ? 
                        html` <div class="dialog-container"> <div style="overflow: auto; width: 100%;"> ${this.renderDialog()} <div></div> </div> </div>
                        ` : ""
                }
            </div>
        `;
    }

    async updateSearch() {
        window.showToast("Searching for sources...", 3000);
        this.loading = true;
        this.sources = [];
        this.requestUpdate();

        var user = await document.getElementById("auth").getUserInfo();
        var search = this.shadowRoot.getElementById("source-search").value;

        var response = await fetch("https://cloud.wisk.cc/v1/source", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,
            },
            body: JSON.stringify({ ops: "find-source", selectedText: search }),
        });

        if (response.ok) {
            var data = await response.json();
            this.sources = data.results;
        } else {
            window.showToast("Failed to load sources", 3000);
        }

        this.loading = false;
        this.requestUpdate();
        console.log(this.sources);
    }

    renderDialog() {
        switch (this.dialogName) {
            case "preview":
                return html`
                    <div class="dialog">
                        <div class="preview-container">
                            <div class="preview-content">${this.previewText}</div>
                            <div class="preview-buttons">
                                <button class="discard" @click=${this.handleDiscardPreview}>Discard</button>
                                <button class="accept" @click=${this.handleAcceptPreview}>Accept</button>
                            </div>
                        </div>
                    </div>
                `;

            case "citations":
                return html`
                    <div class="dialog">
                        <div class="dialog-header">
                            <h3 style="margin-bottom: var(--gap-3)">Select Citation</h3>
                        </div>
                        <div style="overflow: auto; max-height: 400px;">
                            ${this.citations.length === 0 
                                ? html`<p style="line-height: 1.5; font-size: 14px">No citations available. Add citations using the Citations Manager. Or add new using 
                                        <span style="background: var(--bg-3); padding: 2px 4px; border-radius: 4px; color: var(--text-1); display: inline-flex
; align-items: center;">
                                            <img src="/a7/forget/source.svg" alt="Source" style="height: 14px; margin-right: 4px;" /> Find Source</span> option.</p>`
                                : this.citations.map(citation => html`
                                    <div class="source-item">
                                        <div style="display: flex; justify-content: space-between; align-items: start; width: 100%;">
                                            <div style="flex: 1;">
                                                <h3 style="font-size: 14px; margin-bottom: var(--gap-1);">${citation.title}</h3>
                                                <p style="font-size: 12px; color: var(--text-2);">
                                                    ${citation.authors.join(', ')}
                                                    ${citation.publish_date ? ` • ${new Date(citation.publish_date).getFullYear()}` : ''}
                                                </p>
                                            </div>
                                            <button 
                                                @click=${() => this.handleInsertCitation(citation)}
                                                class="button"
                                                style="white-space: nowrap; margin-left: var(--gap-2);">
                                                Insert
                                            </button>
                                        </div>
                                    </div>
                                `)}
                        </div>
                    </div>
                `;

            case "link":
                return html`
                    <div class="dialog">
                        <div class="od">
                            <img src="/a7/forget/link.svg" alt="Link" style="height: 18px; filter: var(--themed-svg);" />
                            <input type="text" placeholder="Enter URL" .value=${this.linkUrl} @input=${(e) => (this.linkUrl = e.target.value)} @keydown=${this.handleLinkKeyDown} class="ai-input" />
                        </div>
                        <div class="dialog-buttons">
                            <button class="cancel" @click=${this.closeDialog}>Cancel</button>
                            <button @click=${this.handleLinkSubmit} class="save">Save</button>
                        </div>
                    </div>
                `;

            case "ai-chat":
                return html`
                    <div class="dialog">
                        <div class="od">
                            <img src="/a7/plugins/toolbar/ai.svg" alt="AI" style="height: 24px;" />
                            <input type="text" placeholder="Ask AI anything..." class="ai-input" style="" @keydown=${(e) => e.key === "Enter" && this.handleToolbarAction("ai-custom", e.target.value)} />
                        </div>
                        <div class="ai-commands">
                            <div class="command-section">
                                <h3>Suggested</h3>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "autocomplete-this-paragraph")}><img src="/a7/plugins/toolbar/autocomplete.svg" alt="wand" style="height: 16px;" /> AI Autocomplete</button>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "improve-writing")}><img src="/a7/plugins/toolbar/wand.svg" alt="wand" style="height: 16px;" /> Improve writing</button>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "fix-spelling-grammar")}><img src="/a7/plugins/toolbar/check.svg" alt="check" style="height: 16px;" /> Fix spelling & grammar</button>
                                <div class="submenu-container">
                                    <button class="submenu-trigger">
                                        <img src="/a7/plugins/toolbar/translate.svg" alt="Translate" style="height: 16px;" /> Translate to
                                        <div style="flex: 1"></div>
                                        <img src="/a7/plugins/toolbar/right.svg" alt=">" style="height: 14px;" />
                                    </button>
                                    <div class="submenu translate-menu">
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-ko")}>Korean</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-zh")}>Chinese</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-ja")}>Japanese</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-en")}>English</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-es")}>Spanish</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-fr")}>French</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-de")}>German</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-it")}>Italian</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-pt")}>Portuguese</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-id")}>Indonesian</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-vi")}>Vietnamese</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-th")}>Thai</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-hi")}>Hindi</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-ar")}>Arabic</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "translate-ru")}>Russian</button>
                                    </div>
                                </div>
                                <div class="submenu-container">
                                    <button class="submenu-trigger">
                                        <img src="/a7/plugins/toolbar/refresh.svg" alt="Translate" style="height: 16px;" /> Paraphrase
                                        <div style="flex: 1"></div>
                                        <img src="/a7/plugins/toolbar/right.svg" alt=">" style="height: 14px;" />
                                    </button>
                                    <div class="submenu paraphrase-menu">
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-academically")}>Academically</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-casually")}>Casually</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-persuasively")}>Persuasively</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-boldly")}>Boldly</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-straightforwardly")}>Straightforwardly</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "paraphrase-friendly")}>Friendly</button>
                                    </div>
                                </div>

                                <button @click=${() => this.handleToolbarAction("ai-operation", "improve-writing")}><img src="/a7/plugins/toolbar/edit.svg" alt="wand" style="height: 16px;" /> Write opposing argument </button>
                            </div>

                            <div class="command-section">
                                <h3>Edit</h3>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "make-shorter")}><img src="/a7/plugins/toolbar/shorter.svg" alt="Shorten" style="height: 16px;" /> Make shorter</button>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "make-longer")}><img src="/a7/plugins/toolbar/longer.svg" alt="Lengthen" style="height: 16px;" /> Make longer</button>
                                <div class="submenu-container">
                                    <button class="submenu-trigger">
                                        <img src="/a7/plugins/toolbar/tone.svg" alt="Tone" style="height: 16px;" /> Change tone
                                        <div style="flex: 1"></div>
                                        <img src="/a7/plugins/toolbar/right.svg" alt=">" style="height: 14px;" />
                                    </button>
                                    <div class="submenu tone-menu">
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "tone-professional")}>Professional</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "tone-casual")}>Casual</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "tone-straightforward")}>Straightforward</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "tone-confident")}>Confident</button>
                                        <button @click=${() => this.handleToolbarAction("ai-operation", "tone-friendly")}>Friendly</button>
                                    </div>
                                </div>
                                <button @click=${() => this.handleToolbarAction("ai-operation", "simplify")}><img src="/a7/plugins/toolbar/simplify.svg" alt="Simplify" style="height: 16px;" /> Simplify language</button>
                            </div>
                        </div>
                    </div>
                `;

            case "sources":
                return html`
                    <div class="dialog">
                        <div style="display: flex; gap: 8px; margin-bottom: 8px">
                            <div class="od" style="margin-bottom: 0; flex: 1; padding: var(--padding-1) var(--padding-2)">
                                <input type="text" placeholder="Search sources" id="source-search" value=${this.selectedText} class="ai-input" />
                                <button style="border: none; font-size: 12px; padding: var(--padding-3); background: transparent" @click=${this.updateSearch}><img src="/a7/plugins/toolbar/search.svg" alt="Search" style="height: 16px; filter: var(--themed-svg)" /></button>
                            </div>
                        </div>
                        <div style="overflow: auto; padding: var(--padding-3) 0">
                            ${this.sources.map(
                                (source) => html`
                                    <div class="source-item">
                                        <h3 style="user-select: text">${source.title}</h3>
                                        <p style="user-select: text">${source.content}</p>
                                        <div style="display: flex; flex-direction: row; justify-content: space-between; width: 100%; align-items: center;">
                                            <a class="url" href=${source.url} target="_blank">${source.url.length > 40 ? source.url.slice(0, 40) + "..." : source.url}</a>
                                            <button @click=${() => this.handleCreateReference(source)} style="border: 1px solid var(--border-1); color: var(--fg-blue)">Add Source</button>
                                        </div>
                                    </div>
                                `,
                            )}
                        </div>
                    </div>
                `;
            default:
                return null;
        }
    }
}

customElements.define("toolbar-element", ToolbarElement);
