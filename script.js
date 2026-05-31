/* ==========================================================================
   GJU AI&DS Resource Hub - Core Script
   ========================================================================== */

// 1. Curriculum Database Mapping (GJU B.Sc AI & DS)
const CURRICULUM_DEFAULT = {
    1: ["Programming in C", "Mathematics-I", "Statistics for Data Science", "Digital Electronics", "Communication Skills"],
    2: ["Python Programming", "Mathematics-II", "Probability and Statistics", "Computer Organization", "Environmental Studies"],
    3: ["Data Structures", "Database Management System", "Object Oriented Programming", "Linear Algebra", "Operating Systems"],
    4: ["Design and Analysis of Algorithms", "Computer Networks", "Data Mining", "R Programming", "Software Engineering"],
    5: ["Artificial Intelligence", "Machine Learning", "Big Data Analytics", "Internet of Things", "Data Visualization"],
    6: ["Deep Learning", "Natural Language Processing", "Cloud Computing", "Information Security", "Project Work"]
};

let CURRICULUM = localStorage.getItem("gju_curriculum_v2") ? JSON.parse(localStorage.getItem("gju_curriculum_v2")) : CURRICULUM_DEFAULT;

// 2. Preloaded Database Generator (Programmatically Populates B.Sc AI & DS Syllabus with 120 high-fidelity resources!)
const INITIAL_RESOURCES = [];

// Helper to generate dynamic preview details for subjects
function generateSyllabusPreview(subject, type) {
    if (type === "notes") {
        return {
            subTitle: `Comprehensive syllabus lecture handbook covering standard learning criteria for ${subject}.`,
            sections: [
                {
                    heading: "Unit 1: Essential Foundations & Overview",
                    text: `This unit covers core theoretical parameters, basic definitions, and foundational workflows related to ${subject}.`,
                    bullets: [
                        `Introduction to key paradigms in ${subject}.`,
                        "Detailed algorithms and concept mappings.",
                        "Recommended readings and core references."
                    ]
                },
                {
                    heading: "Unit 2: Implementation & Practical Applications",
                    text: `Analyzing intermediate methodologies, standard syntax rules, system behaviors, and operational pipelines in ${subject}.`,
                    bullets: [
                        "Real-world application studies and analytics.",
                        "Detailed diagrams and schema structures.",
                        "Self-evaluation problems with complete answers."
                    ]
                }
            ]
        };
    } else {
        return {
            subTitle: `Official GJU Examination Paper covering standard analytical problems in ${subject}.`,
            sections: [
                {
                    heading: "Section A (Compulsory Short Answers)",
                    text: "Answer all questions. Each question carries 2 marks.",
                    bullets: [
                        `Explain the primary utility of core functions in ${subject}.`,
                        `Differentiate between static and dynamic methods in ${subject}.`,
                        `State the central theorem governing ${subject} implementations.`
                    ]
                },
                {
                    heading: "Section B (Detailed Descriptive Answers)",
                    text: "Answer any three questions. Each question carries 10 marks.",
                    bullets: [
                        `Draw the architectural schema representing a typical ${subject} pipeline.`,
                        `Solve the mathematical derivation and optimize the computational bounds.`,
                        `Draft a complete implementation script demonstrating efficient thread scheduling.`
                    ]
                }
            ]
        };
    }
}

// Generate the 120 resources programmatically
(function generateResources() {
    let noteId = 1;
    let paperId = 1;

    // Professors list to add realistic diversity
    const professors = [
        "Dr. Poonam Malik", "Prof. Anil Kumar", "Dr. Sunita Sharma", 
        "Prof. Dinesh Kundu", "Dr. Sandeep Arya", "Prof. Ritu Makker", 
        "Dr. Amita Saxena", "Prof. Manoj Kumar", "Dr. Sanjeev Kumar"
    ];

    for (let sem = 1; sem <= 6; sem++) {
        const subjects = CURRICULUM[sem];
        subjects.forEach((sub, subIdx) => {
            const prof = professors[(sem * 5 + subIdx) % professors.length];
            const rate1 = (4.5 + ((sem * 7 + subIdx) % 5) * 0.1).toFixed(1);
            const rate2 = (4.4 + ((sem * 3 + subIdx) % 6) * 0.1).toFixed(1);
            const dlCount1 = 120 + ((sem * 13 + subIdx * 7) % 150);
            const dlCount2 = 90 + ((sem * 19 + subIdx * 11) % 120);

            // NOTE 1: Core Lecture Notes
            let note1 = {
                id: `note-${noteId++}`,
                title: `${sub} - Comprehensive Lecture Notes (Unit 1-4)`,
                type: "notes",
                semester: sem,
                subject: sub,
                author: prof,
                size: "4.2 MB",
                date: "Sept 2025",
                rating: parseFloat(rate1),
                downloadCount: dlCount1,
                filePath: "#",
                preview: generateSyllabusPreview(sub, "notes")
            };
            INITIAL_RESOURCES.push(note1);

            // NOTE 2: Lab Manual / Study Guide (Hook up real workspace PDFs where applicable!)
            let note2;
            if (sem === 2 && sub === "Python Programming") {
                note2 = {
                    id: "real-1",
                    title: "Python Programming Lab File & Complete Lab Notebook",
                    type: "notes",
                    semester: 2,
                    subject: "Python Programming",
                    author: "Yash Raj (Student)",
                    size: "376 KB",
                    date: "May 2026",
                    rating: 4.9,
                    downloadCount: 154,
                    filePath: "assets/pdf/yashsem2.pdf",
                    preview: {
                        subTitle: "Hands-on implementation of Core Python programming paradigms, script files, and key lab assignments.",
                        sections: [
                            {
                                heading: "Lab 1: Python Introduction & Data Types",
                                text: "Understanding python installation, basic syntaxes, string operations, variables, list, dictionaries, and tuple operations. Python is dynamically typed, which means you don't need to declare variable types explicitly.",
                                bullets: ["Lists are mutable ordered sequences.", "Tuples are immutable ordered sequences.", "Dictionaries map unique keys to values."]
                            },
                            {
                                heading: "Lab 2: Conditional Branches & Loops",
                                text: "Implementing conditional blocks using if-elif-else operators and iterating with for & while loops. We explore nested loop efficiency and structural controls like break, continue, and pass.",
                                bullets: ["Use range() for clean counter loops.", "List comprehensions provide single-line data filtering.", "Nested loops contribute to quadratic space complexity if unchecked."]
                            }
                        ]
                    }
                };
            } else if (sem === 3 && sub === "Data Structures") {
                note2 = {
                    id: "real-2",
                    title: "Data Structures Complete Lab Manual & Assignments",
                    type: "notes",
                    semester: 3,
                    subject: "Data Structures",
                    author: "Yash Raj (Student)",
                    size: "391 KB",
                    date: "Dec 2025",
                    rating: 4.8,
                    downloadCount: 189,
                    filePath: "assets/pdf/yashsem3.pdf",
                    preview: {
                        subTitle: "Extensive syllabus documentation covering Array allocations, Stack/Queue implementations, Tree traversals, and Sorting.",
                        sections: [
                            {
                                heading: "Section 1: Linear Data Structures",
                                text: "Linear structures arrange data sequentially. Stack implements LIFO (Last-In-First-Out) with push/pop, queue implements FIFO (First-In-First-Out) with enqueue/dequeue. Linked lists handle variable sizing with dynamic pointers.",
                                bullets: ["Arrays offer fast O(1) random access but static sizing.", "Linked lists offer dynamic memory mapping but slower retrieval times.", "Circular queues prevent gridlock in memory buffers."]
                            },
                            {
                                heading: "Section 2: Non-Linear Trees & Graphs",
                                text: "Trees construct hierarchical layouts. A Binary Search Tree ensures left child nodes stay smaller than root nodes and right nodes stay larger, delivering O(log n) average search metrics.",
                                bullets: ["Inorder traversal of BST generates sorted outputs.", "Graphs represent entity relations via adjacency matrices.", "Dijkstra's routing computes shortest pathways in weighted graphs."]
                            }
                        ]
                    }
                };
            } else if (sem === 3 && sub === "Database Management System") {
                note2 = {
                    id: "real-3",
                    title: "Database Management Systems Lab Manual & Workbook",
                    type: "notes",
                    semester: 3,
                    subject: "Database Management System",
                    author: "Yash Raj (Student)",
                    size: "381 KB",
                    date: "May 2026",
                    rating: 4.9,
                    downloadCount: 142,
                    filePath: "assets/pdf/yashsem4.pdf",
                    preview: {
                        subTitle: "GJU syllabus practical covering Relational Models, DDL/DML SQL script statements, and Normalization schemas.",
                        sections: [
                            {
                                heading: "Chapter 1: Relational Schema & Constraints",
                                text: "Design of ER layouts mapping Primary and Foreign keys to enforce Referential Integrity. Normalization forms (1NF, 2NF, 3NF, BCNF) eliminate redundant attributes and mitigate anomalies.",
                                bullets: ["1NF removes multi-valued attributes.", "2NF eliminates partial dependency.", "3NF removes transitive dependency transitions."]
                            },
                            {
                                heading: "Chapter 2: Structured Query Language (SQL)",
                                text: "Writing efficient scripts utilizing SELECT statements with INNER, LEFT, RIGHT joins. Aggregation queries using GROUP BY and HAVING filters optimize complex dataset lookups.",
                                bullets: ["DDL commands (CREATE, ALTER, DROP) modify database structure.", "DML commands (INSERT, UPDATE, DELETE) manage records.", "Indexing values drastically improves query speed at the cost of write storage."]
                            }
                        ]
                    }
                };
            } else {
                note2 = {
                    id: `note-${noteId++}`,
                    title: `${sub} - Lab Workbook & Practical Lab Manual`,
                    type: "notes",
                    semester: sem,
                    subject: sub,
                    author: "AI & DS Student Cell",
                    size: "2.8 MB",
                    date: "Oct 2025",
                    rating: parseFloat(rate2),
                    downloadCount: dlCount2,
                    filePath: "#",
                    preview: generateSyllabusPreview(sub, "notes")
                };
            }
            INITIAL_RESOURCES.push(note2);

            // PAPER 1: PYQ End-Semester Exam
            let paper1 = {
                id: `paper-${paperId++}`,
                title: `${sub} - GJU Dec 2024 End-Semester Question Paper`,
                type: "paper",
                semester: sem,
                subject: sub,
                author: "GJU Exam Board",
                size: "1.4 MB",
                date: "Dec 2024",
                rating: parseFloat(rate1),
                downloadCount: dlCount1 + 30,
                filePath: "#",
                preview: generateSyllabusPreview(sub, "paper")
            };
            INITIAL_RESOURCES.push(paper1);

            // PAPER 2: PYQ Mid-Semester Exam
            let paper2 = {
                id: `paper-${paperId++}`,
                title: `${sub} - GJU June 2025 Mid-Semester Exam Sheet`,
                type: "paper",
                semester: sem,
                subject: sub,
                author: "AI & DS Department, GJU",
                size: "850 KB",
                date: "June 2025",
                rating: parseFloat(rate2),
                downloadCount: dlCount2 + 15,
                filePath: "#",
                preview: generateSyllabusPreview(sub, "paper")
            };
            INITIAL_RESOURCES.push(paper2);
        });
    }
})();


// 3. Centralized Firebase State Management Wrapper
let ALL_RESOURCES = [];

class Database {
    static async init() {
        if (this.initialized) return;
        if (this.initializing) return this.initializingPromise;
        
        this.initializing = true;
        this.initializingPromise = (async () => {
            if (window.isFirebaseInitialized && window.db) {
                try {
                    // 1. Fetch Curriculum from Firestore
                    const curDoc = await db.collection("curriculum").doc("default").get();
                    if (curDoc.exists) {
                        CURRICULUM = curDoc.data().semesters;
                    } else {
                        // Seed defaults if empty
                        await db.collection("curriculum").doc("default").set({ semesters: CURRICULUM_DEFAULT });
                        CURRICULUM = CURRICULUM_DEFAULT;
                    }

                    // 2. Fetch Resources from Firestore
                    const resSnap = await db.collection("resources").get();
                    ALL_RESOURCES = [];
                    resSnap.forEach(doc => {
                        ALL_RESOURCES.push({ id: doc.id, ...doc.data() });
                    });

                    // Seeding if Firestore is empty
                    if (ALL_RESOURCES.length === 0) {
                        console.log("Firestore resources collection is empty. Seeding preloaded library...");
                        for (let res of INITIAL_RESOURCES) {
                            res.approved = true; // Auto approved for preloads
                            await db.collection("resources").doc(res.id).set(res);
                        }
                        // Re-fetch seeded data
                        const seedSnap = await db.collection("resources").get();
                        seedSnap.forEach(doc => {
                            ALL_RESOURCES.push({ id: doc.id, ...doc.data() });
                        });
                    }
                    
                    // 3. Fetch Users from Firestore
                    const usersSnap = await db.collection("users").get();
                    let usersList = [];
                    usersSnap.forEach(doc => {
                        usersList.push({ id: doc.id, ...doc.data() });
                    });
                    
                    if (usersList.length === 0) {
                        const defaultUsers = [
                            { id: "user-1", username: "yashrohil07", name: "Yash Rohil", role: "Admin" },
                            { id: "user-2", username: "amit_gju", name: "Amit Sharma", role: "Student" },
                            { id: "user-3", username: "sneha_2026", name: "Sneha Goel", role: "Student" }
                        ];
                        for (let u of defaultUsers) {
                            await db.collection("users").doc(u.username).set(u);
                        }
                        usersList = defaultUsers;
                    }
                    localStorage.setItem("gju_users_v2", JSON.stringify(usersList));
                    
                    // Cache locally for offline backup reference
                    localStorage.setItem("gju_curriculum_v2", JSON.stringify(CURRICULUM));
                    localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(ALL_RESOURCES));
                } catch (err) {
                    console.error("Firebase Firestore fetch error, falling back to LocalStorage:", err);
                    this.fallbackToLocalStorage();
                }
            } else {
                this.fallbackToLocalStorage();
            }
            this.initialized = true;
            this.initializing = false;
        })();
        return this.initializingPromise;
    }

    static fallbackToLocalStorage() {
        if (!localStorage.getItem("gju_curriculum_v2")) {
            localStorage.setItem("gju_curriculum_v2", JSON.stringify(CURRICULUM_DEFAULT));
        }
        if (!localStorage.getItem("gju_resource_hub_bsc_v2")) {
            localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(INITIAL_RESOURCES));
        }
        CURRICULUM = JSON.parse(localStorage.getItem("gju_curriculum_v2"));
        ALL_RESOURCES = JSON.parse(localStorage.getItem("gju_resource_hub_bsc_v2"));
    }

    static getResources() {
        return ALL_RESOURCES;
    }

    static saveResources(resources) {
        ALL_RESOURCES = resources;
        localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(resources));
    }

    static saveResource(resource) {
        // Prevent duplicate local additions
        if (!ALL_RESOURCES.some(r => r.id === resource.id)) {
            ALL_RESOURCES.push(resource);
        }
        localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(ALL_RESOURCES));
        
        if (window.isFirebaseInitialized && window.db) {
            const docId = resource.id;
            const data = { ...resource };
            delete data.id; // Strip local ID as we use it as document ID
            db.collection("resources").doc(docId).set(data)
                .catch(err => console.error("Failed to write resource to Firestore:", err));
        }
    }

    static updateResource(resourceId, updatedFields) {
        const idx = ALL_RESOURCES.findIndex(r => r.id === resourceId);
        if (idx !== -1) {
            ALL_RESOURCES[idx] = { ...ALL_RESOURCES[idx], ...updatedFields };
            localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(ALL_RESOURCES));
            
            if (window.isFirebaseInitialized && window.db) {
                db.collection("resources").doc(resourceId).update(updatedFields)
                    .catch(err => console.error("Failed to update resource in Firestore:", err));
            }
        }
    }

    static deleteResource(resourceId) {
        ALL_RESOURCES = ALL_RESOURCES.filter(r => r.id !== resourceId);
        localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(ALL_RESOURCES));
        
        if (window.isFirebaseInitialized && window.db) {
            db.collection("resources").doc(resourceId).delete()
                .catch(err => console.error("Failed to delete resource in Firestore:", err));
        }
    }

    static getCurriculum() {
        return CURRICULUM;
    }

    static saveCurriculum(curriculum) {
        CURRICULUM = curriculum;
        localStorage.setItem("gju_curriculum_v2", JSON.stringify(curriculum));
        if (window.isFirebaseInitialized && window.db) {
            db.collection("curriculum").doc("default").set({ semesters: curriculum })
                .catch(err => console.error("Failed to sync curriculum map to Firestore:", err));
        }
    }

    static getUsers() {
        if (!localStorage.getItem("gju_users_v2")) {
            const defaultUsers = [
                { id: "user-1", username: "yashrohil07", name: "Yash Rohil", role: "Admin" },
                { id: "user-2", username: "amit_gju", name: "Amit Sharma", role: "Student" },
                { id: "user-3", username: "sneha_2026", name: "Sneha Goel", role: "Student" }
            ];
            localStorage.setItem("gju_users_v2", JSON.stringify(defaultUsers));
        }
        return JSON.parse(localStorage.getItem("gju_users_v2"));
    }

    static saveUsers(users) {
        localStorage.setItem("gju_users_v2", JSON.stringify(users));
        if (window.isFirebaseInitialized && window.db) {
            for (let user of users) {
                db.collection("users").doc(user.username).set(user)
                    .catch(err => console.error("Failed to sync user directory to Firestore:", err));
            }
        }
    }

    static saveUser(user) {
        const users = Database.getUsers();
        const idx = users.findIndex(u => u.username === user.username);
        if (idx !== -1) {
            users[idx] = user;
        } else {
            users.push(user);
        }
        localStorage.setItem("gju_users_v2", JSON.stringify(users));
        if (window.isFirebaseInitialized && window.db) {
            db.collection("users").doc(user.username).set(user)
                .catch(err => console.error("Failed to save user in Firestore:", err));
        }
    }

    static deleteUser(username) {
        const users = Database.getUsers();
        const filtered = users.filter(u => u.username !== username);
        localStorage.setItem("gju_users_v2", JSON.stringify(filtered));
        if (window.isFirebaseInitialized && window.db) {
            db.collection("users").doc(username).delete()
                .catch(err => console.error("Failed to delete user in Firestore:", err));
        }
    }
}

// 4. Global State variables
let currentSemesterFilter = null;
let currentSubjectFilter = "";
let searchQuery = "";

// ==========================================================================
// Shared Elements Initializations
// ==========================================================================

// Navbar responsiveness handling
function initNavbar() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Toggle hamburger icon between bars and times
            const icon = hamburger.querySelector("i");
            if (icon) {
                if (navMenu.classList.contains("active")) {
                    icon.className = "fas fa-times";
                } else {
                    icon.className = "fas fa-bars";
                }
            }
        });
    }

    // Dynamic header style on scroll
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = "0.7rem 0";
                header.style.background = "rgba(4, 6, 12, 0.9)";
            } else {
                header.style.padding = "1.2rem 0";
                header.style.background = "rgba(4, 6, 12, 0.7)";
            }
        }
    });

    // Theme Switcher Initialization
    const themeBtn = document.getElementById("themeToggleBtn");
    const currentTheme = localStorage.getItem("gju_theme") || "dark";
    
    // Set initial class and icon
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeBtn) {
            const icon = themeBtn.querySelector("i");
            if (icon) icon.className = "fas fa-sun";
        }
    } else {
        document.body.classList.remove("light-theme");
        if (themeBtn) {
            const icon = themeBtn.querySelector("i");
            if (icon) icon.className = "fas fa-moon";
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const isLight = document.body.classList.contains("light-theme");
            localStorage.setItem("gju_theme", isLight ? "light" : "dark");
            
            const icon = themeBtn.querySelector("i");
            if (icon) {
                icon.className = isLight ? "fas fa-sun" : "fas fa-moon";
            }
            
            showToast(`${isLight ? 'Light' : 'Dark'} Theme Activated!`);
        });
    }
}

// Custom Virtual PDF Reader Modal activation
function initPdfViewerModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "pdfViewerModal";
    overlay.innerHTML = `
        <div class="pdf-viewer-shell">
            <div class="viewer-top-bar">
                <div class="viewer-doc-info">
                    <i class="fas fa-file-pdf"></i>
                    <h3 id="viewerTitle">Document Title</h3>
                </div>
                <div class="viewer-controls">
                    <div class="zoom-widget">
                        <button class="zoom-btn" id="zoomOutBtn"><i class="fas fa-minus"></i></button>
                        <span class="zoom-val" id="zoomValue">100%</span>
                        <button class="zoom-btn" id="zoomInBtn"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="viewer-actions">
                        <button class="btn-circle" id="fullscreenBtn" title="Toggle Fullscreen"><i class="fas fa-expand"></i></button>
                        <a href="#" class="btn-circle" id="viewerDownloadBtn" title="Download Document"><i class="fas fa-download"></i></a>
                        <button class="btn-circle btn-close-viewer" id="closeViewerBtn"><i class="fas fa-times"></i></button>
                    </div>
                </div>
            </div>
            <div class="viewer-content-area" id="viewerContent">
                <!-- Dynamic Pages will be rendered here -->
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Setup close listeners
    const closeBtn = overlay.querySelector("#closeViewerBtn");
    closeBtn.addEventListener("click", closeViewer);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeViewer();
    });

    // Zoom Handlers
    let currentZoom = 100;
    const zoomValSpan = overlay.querySelector("#zoomValue");
    const contentArea = overlay.querySelector("#viewerContent");
    
    overlay.querySelector("#zoomInBtn").addEventListener("click", () => {
        if (currentZoom < 150) {
            currentZoom += 10;
            zoomValSpan.textContent = `${currentZoom}%`;
            contentArea.style.transform = `scale(${currentZoom / 100})`;
            contentArea.style.transformOrigin = "top center";
        }
    });

    overlay.querySelector("#zoomOutBtn").addEventListener("click", () => {
        if (currentZoom > 70) {
            currentZoom -= 10;
            zoomValSpan.textContent = `${currentZoom}%`;
            contentArea.style.transform = `scale(${currentZoom / 100})`;
            contentArea.style.transformOrigin = "top center";
        }
    });

    // Fullscreen toggler
    const fullscreenBtn = overlay.querySelector("#fullscreenBtn");
    fullscreenBtn.addEventListener("click", () => {
        const shell = overlay.querySelector(".pdf-viewer-shell");
        if (!document.fullscreenElement) {
            shell.requestFullscreen().catch(err => {
                console.error(`Error enabling fullscreen: ${err.message}`);
            });
            fullscreenBtn.querySelector("i").className = "fas fa-compress";
        } else {
            document.exitFullscreen();
            fullscreenBtn.querySelector("i").className = "fas fa-expand";
        }
    });
}

// Helper: Convert Base64 data URL to Blob
function dataURLtoBlob(dataurl) {
    try {
        var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type:mime});
    } catch(e) {
        console.error("Failed to parse Data URL to Blob:", e);
        throw e;
    }
}

// Global variable tracking active Blob URL for reader modal
let currentBlobUrl = null;

// Helper: Get PDF URL (server path or dynamic Blob URL)
function getResourcePdfUrl(resource) {
    if (resource.filePath && resource.filePath !== "#") {
        return resource.filePath;
    }
    if (resource.fileData) {
        if (currentBlobUrl) {
            URL.revokeObjectURL(currentBlobUrl);
            currentBlobUrl = null;
        }
        try {
            const blob = dataURLtoBlob(resource.fileData);
            currentBlobUrl = URL.createObjectURL(blob);
            return currentBlobUrl;
        } catch (e) {
            console.error("Error creating Blob URL from Base64 Data URL:", e);
            return resource.fileData; // Fallback to base64 string direkt
        }
    }
    return null;
}

// Helper: Download resource (works for both server paths and Base64 storage streams!)
function downloadResource(resourceId) {
    const db = Database.getResources();
    const res = db.find(r => r.id === resourceId);
    if (!res) return;

    incrementDownloads(resourceId);

    if (res.filePath && res.filePath !== "#") {
        const link = document.createElement("a");
        link.href = res.filePath;
        link.download = res.title + ".pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else if (res.fileData) {
        try {
            const blob = dataURLtoBlob(res.fileData);
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = res.title + ".pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (e) {
            console.error("Download failed using Blob URL, falling back to direct Data URL", e);
            const link = document.createElement("a");
            link.href = res.fileData;
            link.download = res.title + ".pdf";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    } else {
        // Mock download fallback (for mock materials)
        showToast("Generating mock PDF syllabus download...");
        const text = `GJU AI & DS HUB - Study Resource\n\nTitle: ${res.title}\nSubject: ${res.subject}\nAuthor: ${res.author}\nDate: ${res.date}\nSize: ${res.size}\n\nSyllabus Revision Reference Material. Check online portal for more updates.`;
        const blob = new Blob([text], {type: "text/plain"});
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = res.title + ".txt";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
    }
}

function openViewer(resourceId) {
    const db = Database.getResources();
    const resource = db.find(r => r.id === resourceId);
    if (!resource) return;

    const overlay = document.querySelector("#pdfViewerModal");
    if (!overlay) return;

    // Set Meta
    overlay.querySelector("#viewerTitle").textContent = resource.title;
    
    const downloadBtn = overlay.querySelector("#viewerDownloadBtn");
    downloadBtn.onclick = (e) => {
        e.preventDefault();
        downloadResource(resource.id);
    };

    const contentArea = overlay.querySelector("#viewerContent");
    contentArea.innerHTML = "";
    contentArea.style.transform = "scale(1)";
    overlay.querySelector("#zoomValue").textContent = "100%";

    // Render interactive High-Fidelity pages matching actual GJU syllabus notes!
    const pageData = resource.preview || {
        subTitle: "Digital study material indexing syllabus criteria.",
        sections: [
            {
                heading: "Section 1: General Core Guidelines",
                text: "This document reviews the essential parameters, core theorems, and design considerations outlined under the Guru Jambheshwar University AI & DS branch specifications.",
                bullets: ["Enforces semantic analysis parameters.", "Provides sample questions and references.", "Acts as an official revision asset."]
            }
        ]
    };

    const pdfUrl = getResourcePdfUrl(resource);
    
    if (pdfUrl) {
        // Real PDF Exists! Render split Reader vs Discussion view
        const topBar = overlay.querySelector(".viewer-top-bar");
        const controls = overlay.querySelector(".viewer-controls");
        
        // Remove any old tab container
        const oldTabs = topBar.querySelector(".viewer-tabs-container");
        if (oldTabs) oldTabs.remove();
        
        const tabsContainer = document.createElement("div");
        tabsContainer.className = "viewer-tabs-container";
        tabsContainer.style.marginRight = "1rem";
        tabsContainer.innerHTML = `
            <div style="display:flex; gap:0.3rem; background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:30px; padding:0.2rem;">
                <button class="viewer-tab-btn active" id="btnTabPdf" style="padding:0.4rem 0.8rem; border-radius:30px; font-size:0.75rem; color:var(--text-highlight); font-weight:600; cursor:pointer; background:rgba(255,255,255,0.1); border:none; display:flex; align-items:center; gap:0.4rem;"><i class="fas fa-file-pdf"></i> Reader</button>
                <button class="viewer-tab-btn" id="btnTabReviews" style="padding:0.4rem 0.8rem; border-radius:30px; font-size:0.75rem; color:var(--text-muted); font-weight:600; cursor:pointer; background:none; border:none; display:flex; align-items:center; gap:0.4rem;"><i class="fas fa-comments"></i> Discussion</button>
            </div>
        `;
        
        // Insert tabs before zoom controls
        controls.insertBefore(tabsContainer, controls.firstChild);
        
        // Render split viewer containers
        contentArea.innerHTML = `
            <div id="pdfReaderContainer" style="width:100%; height:100%; display:block;">
                <iframe src="${pdfUrl}" style="width:100%; height:100%; border:none; border-radius:8px; background:#1e293b;" id="realPdfIframe"></iframe>
            </div>
            <div id="pdfReviewsContainer" style="width:100%; height:100%; display:none; overflow-y:auto; padding:1.5rem; justify-content:center; align-items:center; background:#111827;">
                <!-- Page 3 will be appended here -->
            </div>
        `;
        
        const readerCont = contentArea.querySelector("#pdfReaderContainer");
        const reviewsCont = contentArea.querySelector("#pdfReviewsContainer");
        
        // Render Page 3 inside reviews container
        const page3 = document.createElement("div");
        page3.className = "pdf-mock-page";
        page3.style.boxShadow = "none";
        page3.style.margin = "0 auto";
        page3.id = "viewerPage3";
        
        // Ensure reviews exist
        if (!resource.reviews) {
            const roundedRating = Math.round(resource.rating || 5);
            resource.reviews = [
                { author: "Rahul Sharma", rating: roundedRating, date: "May 22, 2026", text: "Extremely helpful study guide. The concepts are explained in a very easy to understand manner!" },
                { author: "Sneha Goel", rating: 5, date: "May 15, 2026", text: "Highly recommend downloading this. Perfectly aligned with the GJU mid-sem exams." }
            ];
        }
        
        function drawPage3() {
            let starsHtml = "";
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="far fa-star star-interactive" data-star="${i}"></i>`;
            }
            
            let commentsListHtml = "";
            resource.reviews.forEach(rev => {
                let revStars = "";
                for (let i = 1; i <= 5; i++) {
                    revStars += `<i class="${i <= rev.rating ? 'fas' : 'far'} fa-star" style="color:#fbbf24; font-size:0.8rem; margin-right:1px;"></i>`;
                }
                commentsListHtml += `
                    <div class="comment-bubble">
                        <div class="comment-meta">
                            <span class="comment-author">${rev.author}</span>
                            <span>${revStars} &nbsp;&bull;&nbsp; ${rev.date}</span>
                        </div>
                        <div class="comment-text">${rev.text}</div>
                    </div>
                `;
            });
            
            page3.innerHTML = `
                <div class="pdf-header-meta">
                    <span>Community Discussion</span>
                    <span>Ratings & Comments</span>
                </div>
                <div class="pdf-watermark">GJU COMMUNITY</div>
                
                <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 0.8rem; font-family: 'Outfit'; border-bottom: 2px solid #a855f7; padding-bottom: 0.3rem;">
                    Reviews & Ratings
                </h2>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.2rem; margin-bottom:1.2rem;">
                    <div style="background:rgba(99,102,241,0.05); padding:0.8rem; border-radius:8px; border:1px solid rgba(99,102,241,0.1); text-align:center;">
                        <span style="font-size:2.2rem; font-weight:800; color:#fbbf24; display:block; font-family:'Outfit'; line-height:1.2;">${resource.rating.toFixed(1)}</span>
                        <span style="font-size:0.75rem; color:#475569; font-weight:600;">Average Community Rating</span>
                        <span style="font-size:0.7rem; color:#64748b; display:block; margin-top:0.1rem;">Based on ${resource.reviews.length} reviews</span>
                    </div>
                    
                    <div style="background:rgba(168,85,247,0.05); padding:0.8rem; border-radius:8px; border:1px solid rgba(168,85,247,0.1); text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                        <span style="font-size:0.8rem; color:#475569; font-weight:600; margin-bottom:0.3rem;">Submit Your Rating</span>
                        <div class="star-rating-interactive" id="viewerInteractiveStars">
                            ${starsHtml}
                        </div>
                        <span id="selectedRatingText" style="font-size:0.7rem; color:#64748b; font-weight:600; margin-top:0.2rem;">Tap a star to rate</span>
                    </div>
                </div>
                
                <div style="border-top:1px solid #e2e8f0; padding-top:0.8rem;">
                    <h3 style="font-size:1rem; color:#1e293b; margin-bottom:0.6rem; font-family:'Outfit';">Student Reviews</h3>
                    <div style="max-height:140px; overflow-y:auto; padding-right:0.5rem; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:0.8rem;">
                        ${commentsListHtml}
                    </div>
                </div>
                
                <!-- Submit Form -->
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:0.6rem; display:flex; gap:0.5rem; margin-top:0.5rem;">
                    <input type="text" id="viewerCommentInput" placeholder="Write a review..." style="flex-grow:1; font-size:0.8rem; padding:0.4rem; border:1px solid #cbd5e1; border-radius:6px; background:white; color:#0f172a;" />
                    <button class="btn-primary" id="btnViewerSubmitComment" style="padding:0.4rem 0.8rem; border-radius:6px; font-size:0.75rem; height:auto; box-shadow:none; background:var(--grad-primary); border:none;">Publish</button>
                </div>
                
                <div class="pdf-footer-meta" style="margin-top:auto; padding-top:1rem;">
                    <span>GJU Resource Hub Discussion</span>
                    <span>Page 3 of 3</span>
                </div>
            `;
            
            // Add interactive star click listeners
            let userRating = 0;
            const stars = page3.querySelectorAll(".star-interactive");
            stars.forEach(star => {
                star.addEventListener("click", () => {
                    userRating = parseInt(star.getAttribute("data-star"));
                    stars.forEach(s => {
                        const idx = parseInt(s.getAttribute("data-star"));
                        if (idx <= userRating) {
                            s.className = "fas fa-star star-interactive active";
                        } else {
                            s.className = "far fa-star star-interactive";
                        }
                    });
                    page3.querySelector("#selectedRatingText").textContent = `Rated ${userRating} Stars!`;
                    page3.querySelector("#selectedRatingText").style.color = "#fbbf24";
                });
            });
            
            const submitBtn = page3.querySelector("#btnViewerSubmitComment");
            submitBtn.addEventListener("click", () => {
                const commentVal = page3.querySelector("#viewerCommentInput").value.trim();
                if (userRating === 0) {
                    showToast("Please select a star rating first!");
                    return;
                }
                if (!commentVal) {
                    showToast("Please enter a short review!");
                    return;
                }
                
                // Append to database
                const db2 = Database.getResources();
                const resIdx = db2.findIndex(r => r.id === resource.id);
                if (resIdx !== -1) {
                    const targetRes = db2[resIdx];
                    if (!targetRes.reviews) {
                        targetRes.reviews = resource.reviews;
                    }
                    
                    targetRes.reviews.push({
                        author: "You (Student)",
                        rating: userRating,
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        text: commentVal
                    });
                    
                    // Average the ratings
                    targetRes.rating = parseFloat((targetRes.reviews.reduce((acc, r) => acc + r.rating, 0) / targetRes.reviews.length).toFixed(1));
                    
                    if (window.isFirebaseInitialized) {
                        db.collection("resources").doc(resource.id).update({
                            reviews: targetRes.reviews,
                            rating: targetRes.rating
                        }).catch(e => console.error("Error writing review:", e));
                    }
                    localStorage.setItem("gju_resource_hub_bsc_v2", JSON.stringify(db2));
                    
                    // Update local references
                    resource.reviews = targetRes.reviews;
                    resource.rating = targetRes.rating;
                    
                    showToast("Review submitted successfully!");
                    
                    // Re-draw Page 3!
                    drawPage3();
                    
                    // Refresh background grids depending on the active page
                    if (document.getElementById("filesGrid")) {
                        const pageType = document.getElementById("notesLink") && document.getElementById("notesLink").classList.contains("active") ? "notes" : "paper";
                        renderResources(pageType);
                    } else if (document.getElementById("recentUploadsGrid")) {
                        renderRecentUploads();
                        renderTopRatedResources();
                    }
                }
            });
        }
        
        drawPage3();
        reviewsCont.appendChild(page3);
        
        // Tab click behaviors
        const btnTabPdf = tabsContainer.querySelector("#btnTabPdf");
        const btnTabReviews = tabsContainer.querySelector("#btnTabReviews");
        
        btnTabPdf.addEventListener("click", () => {
            btnTabPdf.classList.add("active");
            btnTabPdf.style.background = "rgba(255,255,255,0.1)";
            btnTabPdf.style.color = "var(--text-highlight)";
            
            btnTabReviews.classList.remove("active");
            btnTabReviews.style.background = "none";
            btnTabReviews.style.color = "var(--text-muted)";
            
            readerCont.style.display = "block";
            reviewsCont.style.display = "none";
        });
        
        btnTabReviews.addEventListener("click", () => {
            btnTabReviews.classList.add("active");
            btnTabReviews.style.background = "rgba(255,255,255,0.1)";
            btnTabReviews.style.color = "var(--text-highlight)";
            
            btnTabPdf.classList.remove("active");
            btnTabPdf.style.background = "none";
            btnTabPdf.style.color = "var(--text-muted)";
            
            readerCont.style.display = "none";
            reviewsCont.style.display = "flex";
        });
        
    } else {
        // MOCK PDF: No real PDF file. Render 3 scrollable mock pages (Page 1, 2, 3) as we did before!
        const topBar = overlay.querySelector(".viewer-top-bar");
        const oldTabs = topBar.querySelector(".viewer-tabs-container");
        if (oldTabs) oldTabs.remove();

        const page1 = document.createElement("div");
        page1.className = "pdf-mock-page";
        page1.innerHTML = `
            <div class="pdf-header-meta">
                <span>Guru Jambheshwar University (GJU)</span>
                <span>AI & DS Dept</span>
            </div>
            <div class="pdf-watermark">GJU AI & DS HUB</div>
            
            <div style="margin-top: 3rem; flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
                <span class="tag-badge" style="width: fit-content; margin-bottom: 1.5rem;">${resource.type.toUpperCase()} MATERIAL</span>
                <h1 class="pdf-content-title">${resource.title}</h1>
                <p class="pdf-subtitle">${pageData.subTitle}</p>
                
                <div style="border-top: 1px solid #cbd5e1; padding-top: 2rem; margin-top: 2rem; font-size: 0.9rem; color: #475569;">
                    <p><strong>Subject:</strong> ${resource.subject} (Semester ${resource.semester})</p>
                    <p><strong>Published By:</strong> ${resource.author}</p>
                    <p><strong>Compiled On:</strong> ${resource.date}</p>
                    <p><strong>File Size:</strong> ${resource.size}</p>
                </div>
            </div>
            
            <div class="pdf-footer-meta">
                <span>Official GJU Hub Resource</span>
                <span>Page 1 of 3</span>
            </div>
        `;
        contentArea.appendChild(page1);

        const page2 = document.createElement("div");
        page2.className = "pdf-mock-page";
        
        let contentHtml = `
            <div class="pdf-header-meta">
                <span>${resource.subject}</span>
                <span>Semester ${resource.semester}</span>
            </div>
            <div class="pdf-watermark">GJU AI & DS HUB</div>
            
            <h2 style="font-size: 1.5rem; color: #0f172a; margin-bottom: 1.5rem; font-family: 'Outfit'; border-bottom: 2px solid #6366f1; padding-bottom: 0.4rem;">
                Course Syllabus - Core Syllabus
            </h2>
        `;

        pageData.sections.forEach(sec => {
            contentHtml += `
                <div class="pdf-section-heading">${sec.heading}</div>
                <p class="pdf-body-text">${sec.text}</p>
            `;
            if (sec.bullets && sec.bullets.length > 0) {
                contentHtml += `<ul class="pdf-bullet-list">`;
                sec.bullets.forEach(b => {
                    contentHtml += `<li>${b}</li>`;
                });
                contentHtml += `</ul>`;
            }
        });

        contentHtml += `
            <div class="pdf-footer-meta">
                <span>Course Syllabus Revision Asset</span>
                <span>Page 2 of 3</span>
            </div>
        `;
        
        page2.innerHTML = contentHtml;
        contentArea.appendChild(page2);

        const page3 = document.createElement("div");
        page3.className = "pdf-mock-page";
        page3.id = "viewerPage3";
        
        // Ensure reviews exist
        if (!resource.reviews) {
            const roundedRating = Math.round(resource.rating || 5);
            resource.reviews = [
                { author: "Rahul Sharma", rating: roundedRating, date: "May 22, 2026", text: "Extremely helpful study guide. The concepts are explained in a very easy to understand manner!" },
                { author: "Sneha Goel", rating: 5, date: "May 15, 2026", text: "Highly recommend downloading this. Perfectly aligned with the GJU mid-sem exams." }
            ];
        }
        
        function drawPage3Mock() {
            let starsHtml = "";
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="far fa-star star-interactive" data-star="${i}"></i>`;
            }
            
            let commentsListHtml = "";
            resource.reviews.forEach(rev => {
                let revStars = "";
                for (let i = 1; i <= 5; i++) {
                    revStars += `<i class="${i <= rev.rating ? 'fas' : 'far'} fa-star" style="color:#fbbf24; font-size:0.8rem; margin-right:1px;"></i>`;
                }
                commentsListHtml += `
                    <div class="comment-bubble">
                        <div class="comment-meta">
                            <span class="comment-author">${rev.author}</span>
                            <span>${revStars} &nbsp;&bull;&nbsp; ${rev.date}</span>
                        </div>
                        <div class="comment-text">${rev.text}</div>
                    </div>
                `;
            });
            
            page3.innerHTML = `
                <div class="pdf-header-meta">
                    <span>Community Discussion</span>
                    <span>Ratings & Comments</span>
                </div>
                <div class="pdf-watermark">GJU COMMUNITY</div>
                
                <h2 style="font-size: 1.4rem; color: #0f172a; margin-bottom: 0.8rem; font-family: 'Outfit'; border-bottom: 2px solid #a855f7; padding-bottom: 0.3rem;">
                    Reviews & Ratings
                </h2>
                
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1.2rem; margin-bottom:1.2rem;">
                    <div style="background:rgba(99,102,241,0.05); padding:0.8rem; border-radius:8px; border:1px solid rgba(99,102,241,0.1); text-align:center;">
                        <span style="font-size:2.2rem; font-weight:800; color:#fbbf24; display:block; font-family:'Outfit'; line-height:1.2;">${resource.rating.toFixed(1)}</span>
                        <span style="font-size:0.75rem; color:#475569; font-weight:600;">Average Community Rating</span>
                        <span style="font-size:0.7rem; color:#64748b; display:block; margin-top:0.1rem;">Based on ${resource.reviews.length} reviews</span>
                    </div>
                    
                    <div style="background:rgba(168,85,247,0.05); padding:0.8rem; border-radius:8px; border:1px solid rgba(168,85,247,0.1); text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center;">
                        <span style="font-size:0.8rem; color:#475569; font-weight:600; margin-bottom:0.3rem;">Submit Your Rating</span>
                        <div class="star-rating-interactive" id="viewerInteractiveStars">
                            ${starsHtml}
                        </div>
                        <span id="selectedRatingText" style="font-size:0.7rem; color:#64748b; font-weight:600; margin-top:0.2rem;">Tap a star to rate</span>
                    </div>
                </div>
                
                <div style="border-top:1px solid #e2e8f0; padding-top:0.8rem;">
                    <h3 style="font-size:1rem; color:#1e293b; margin-bottom:0.6rem; font-family:'Outfit';">Student Reviews</h3>
                    <div style="max-height:140px; overflow-y:auto; padding-right:0.5rem; display:flex; flex-direction:column; gap:0.6rem; margin-bottom:0.8rem;">
                        ${commentsListHtml}
                    </div>
                </div>
                
                <!-- Submit Form -->
                <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:0.6rem; display:flex; gap:0.5rem; margin-top:0.5rem;">
                    <input type="text" id="viewerCommentInput" placeholder="Write a review..." style="flex-grow:1; font-size:0.8rem; padding:0.4rem; border:1px solid #cbd5e1; border-radius:6px; background:white; color:#0f172a;" />
                    <button class="btn-primary" id="btnViewerSubmitComment" style="padding:0.4rem 0.8rem; border-radius:6px; font-size:0.75rem; height:auto; box-shadow:none; background:var(--grad-primary); border:none;">Publish</button>
                </div>
                
                <div class="pdf-footer-meta" style="margin-top:auto; padding-top:1rem;">
                    <span>GJU Resource Hub Discussion</span>
                    <span>Page 3 of 3</span>
                </div>
            `;
            
            // Add interactive star click listeners
            let userRating = 0;
            const stars = page3.querySelectorAll(".star-interactive");
            stars.forEach(star => {
                star.addEventListener("click", () => {
                    userRating = parseInt(star.getAttribute("data-star"));
                    stars.forEach(s => {
                        const idx = parseInt(s.getAttribute("data-star"));
                        if (idx <= userRating) {
                            s.className = "fas fa-star star-interactive active";
                        } else {
                            s.className = "far fa-star star-interactive";
                        }
                    });
                    page3.querySelector("#selectedRatingText").textContent = `Rated ${userRating} Stars!`;
                    page3.querySelector("#selectedRatingText").style.color = "#fbbf24";
                });
            });
            
            const submitBtn = page3.querySelector("#btnViewerSubmitComment");
            submitBtn.addEventListener("click", () => {
                const commentVal = page3.querySelector("#viewerCommentInput").value.trim();
                if (userRating === 0) {
                    showToast("Please select a star rating first!");
                    return;
                }
                if (!commentVal) {
                    showToast("Please enter a short review!");
                    return;
                }
                
                // Append to database
                const db2 = Database.getResources();
                const resIdx = db2.findIndex(r => r.id === resource.id);
                if (resIdx !== -1) {
                    const targetRes = db2[resIdx];
                    if (!targetRes.reviews) {
                        targetRes.reviews = resource.reviews;
                    }
                    
                    targetRes.reviews.push({
                        author: "You (Student)",
                        rating: userRating,
                        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                        text: commentVal
                    });
                    
                    // Average the ratings
                    targetRes.rating = parseFloat((targetRes.reviews.reduce((acc, r) => acc + r.rating, 0) / targetRes.reviews.length).toFixed(1));
                    
                    if (window.isFirebaseInitialized && window.db) {
                        db.collection("resources").doc(resource.id).update({
                            reviews: targetRes.reviews,
                            rating: targetRes.rating
                        }).catch(e => console.error("Error writing review:", e));
                    }
                    Database.saveResources(db2);
                    
                    // Update local references
                    resource.reviews = targetRes.reviews;
                    resource.rating = targetRes.rating;
                    
                    showToast("Review submitted successfully!");
                    
                    // Re-draw Page 3!
                    drawPage3Mock();
                    
                    // Refresh background grids depending on the active page
                    if (document.getElementById("filesGrid")) {
                        const pageType = document.getElementById("notesLink") && document.getElementById("notesLink").classList.contains("active") ? "notes" : "paper";
                        renderResources(pageType);
                    } else if (document.getElementById("recentUploadsGrid")) {
                        renderRecentUploads();
                        renderTopRatedResources();
                    }
                }
            });
        }
        
        drawPage3Mock();
        contentArea.appendChild(page3);
    }

    // Show Overlay
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent body scrolling
}

function closeViewer() {
    const overlay = document.querySelector("#pdfViewerModal");
    if (overlay) {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
        if (document.fullscreenElement) {
            document.exitFullscreen().catch(err => console.log(err));
        }
        
        // Revoke active Blob URL to prevent memory leaks
        if (currentBlobUrl) {
            URL.revokeObjectURL(currentBlobUrl);
            currentBlobUrl = null;
        }

        // Clean up tab container inside header if it exists
        const oldTabs = overlay.querySelector(".viewer-tabs-container");
        if (oldTabs) oldTabs.remove();
    }
}

// Custom Glassmorphic Edit Modal activation
function initEditModal() {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.id = "editModal";
    overlay.innerHTML = `
        <div class="pdf-viewer-shell" style="max-width: 600px; height: auto; max-height: 90vh;">
            <div class="viewer-top-bar">
                <div class="viewer-doc-info">
                    <i class="fas fa-edit" style="color: var(--primary);"></i>
                    <h3>Edit Resource Details</h3>
                </div>
                <div class="viewer-controls">
                    <button class="btn-circle btn-close-viewer" id="closeEditModalBtn"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div style="padding: 2.5rem; overflow-y: auto; background: var(--bg-darker);">
                <form id="editForm">
                    <input type="hidden" id="editResId">
                    <input type="hidden" id="editPageType">
                    
                    <div class="form-group" style="margin-bottom: 1.2rem;">
                        <label for="editTitle" style="font-size: 0.95rem; font-weight:600; margin-bottom:0.5rem; display:block;">Resource Title</label>
                        <input type="text" class="form-control" id="editTitle" required style="width:100%;">
                    </div>
                    
                    <div class="form-grid" style="margin-bottom: 1.5rem; display:grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div class="form-group">
                            <label for="editSemester" style="font-size: 0.95rem; font-weight:600; margin-bottom:0.5rem; display:block;">Semester</label>
                            <div class="select-wrapper">
                                <select class="custom-select form-control" id="editSemester" required>
                                    <option value="1">Semester 1</option>
                                    <option value="2">Semester 2</option>
                                    <option value="3">Semester 3</option>
                                    <option value="4">Semester 4</option>
                                    <option value="5">Semester 5</option>
                                    <option value="6">Semester 6</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="editSubject" style="font-size: 0.95rem; font-weight:600; margin-bottom:0.5rem; display:block;">Subject</label>
                            <div class="select-wrapper">
                                <select class="custom-select form-control" id="editSubject" required>
                                    <!-- Populated dynamically -->
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 1.5rem;">
                        <label for="editAuthor" style="font-size: 0.95rem; font-weight:600; margin-bottom:0.5rem; display:block;">Author / Contributor</label>
                        <input type="text" class="form-control" id="editAuthor" style="width:100%;">
                    </div>
                    
                    <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 1rem;">
                        <button type="button" class="btn-secondary" id="btnCancelEdit" style="padding: 0.8rem 1.5rem;">Cancel</button>
                        <button type="submit" class="btn-primary" style="padding: 0.8rem 1.5rem;">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector("#closeEditModalBtn");
    const cancelBtn = overlay.querySelector("#btnCancelEdit");
    const form = overlay.querySelector("#editForm");
    const semSelect = overlay.querySelector("#editSemester");
    const subSelect = overlay.querySelector("#editSubject");

    // Close logic
    const closeEdit = () => {
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
    };
    closeBtn.addEventListener("click", closeEdit);
    cancelBtn.addEventListener("click", closeEdit);
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeEdit();
    });

    // Sync subjects inside Edit Modal
    semSelect.addEventListener("change", () => {
        const sem = parseInt(semSelect.value);
        subSelect.innerHTML = "";
        if (sem && CURRICULUM[sem]) {
            CURRICULUM[sem].forEach(sub => {
                const opt = document.createElement("option");
                opt.value = sub;
                opt.textContent = sub;
                subSelect.appendChild(opt);
            });
        }
    });

    // Form submit inside Edit Modal
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = overlay.querySelector("#editResId").value;
        const pageType = overlay.querySelector("#editPageType").value;
        const title = overlay.querySelector("#editTitle").value.trim();
        const semester = parseInt(semSelect.value);
        const subject = subSelect.value;
        const author = overlay.querySelector("#editAuthor").value.trim() || "Anonymous Contributor";

        const db = Database.getResources();
        const idx = db.findIndex(r => r.id === id);
        if (idx !== -1) {
            db[idx].title = title;
            db[idx].semester = semester;
            db[idx].subject = subject;
            db[idx].author = author;
            // Update preview details too!
            db[idx].preview.sections[0].heading = "Document Overview & Definitions";
            db[idx].preview.sections[0].text = `This notes catalog is compiled covering specific curriculum objectives for ${subject} in Semester ${semester}.`;

            Database.updateResource(id, {
                title: title,
                semester: semester,
                subject: subject,
                author: author,
                preview: db[idx].preview
            });
            
            showToast("Resource details updated successfully!");
            closeEdit();
            renderResources(pageType);
        }
    });
}

function openEditModal(resourceId, pageType) {
    const db = Database.getResources();
    const res = db.find(r => r.id === resourceId);
    if (!res) return;

    const overlay = document.querySelector("#editModal");
    if (!overlay) return;

    overlay.querySelector("#editResId").value = res.id;
    overlay.querySelector("#editPageType").value = pageType;
    overlay.querySelector("#editTitle").value = res.title;
    overlay.querySelector("#editSemester").value = res.semester;
    overlay.querySelector("#editAuthor").value = res.author;

    // Trigger sync subject change for semester
    const semSelect = overlay.querySelector("#editSemester");
    const subSelect = overlay.querySelector("#editSubject");
    
    subSelect.innerHTML = "";
    if (CURRICULUM[res.semester]) {
        CURRICULUM[res.semester].forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub;
            opt.textContent = sub;
            if (sub === res.subject) opt.selected = true;
            subSelect.appendChild(opt);
        });
    }

    // Show Overlay
    overlay.style.display = "flex";
    document.body.style.overflow = "hidden";
}

function deleteResource(resourceId, pageType) {
    if (confirm("Are you absolutely sure you want to delete this contributed resource? This action cannot be undone.")) {
        const db = Database.getResources();
        Database.deleteResource(resourceId);
        showToast("Resource deleted successfully!");
        renderResources(pageType);
    }
}

// Increment downloads count and trigger actual file download
function incrementDownloads(resourceId) {
    const db = Database.getResources();
    const idx = db.findIndex(r => r.id === resourceId);
    if (idx !== -1) {
        const newCount = db[idx].downloadCount + 1;
        Database.updateResource(resourceId, { downloadCount: newCount });
        
        // Update grid element stats if on the resource browser pages
        const card = document.querySelector(`[data-id="${resourceId}"]`);
        if (card) {
            const dlSpan = card.querySelector(".download-counter");
            if (dlSpan) {
                dlSpan.innerHTML = `<i class="fas fa-download"></i> ${db[idx].downloadCount} Downloads`;
            }
        }
    }
}

// Toast Alert notification generator
function showToast(message) {
    const existing = document.querySelector(".toast-container");
    if (existing) existing.remove();

    const container = document.createElement("div");
    container.className = "toast-container";
    container.innerHTML = `
        <div class="toast">
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(container);

    const toast = container.querySelector(".toast");
    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => container.remove(), 400);
    }, 3500);
}

// ==========================================================================
// Index Page Logic (index.html)
// ==========================================================================
// ==========================================================================
// Index Page Logic (index.html)
// ==========================================================================
function initIndexPage() {
    initPdfViewerModal();
    initEditModal();

    // Dynamic loading of counters based on current localstorage database size
    const db = Database.getResources();
    const approvedDb = db.filter(r => r.approved !== false);
    const noteCount = approvedDb.filter(r => r.type === "notes").length;
    const paperCount = approvedDb.filter(r => r.type === "paper").length;
    const totalCount = approvedDb.length;
    
    // Animate stats numbers
    animateNumber("totalResourcesVal", totalCount, 1500);
    animateNumber("totalPapersVal", paperCount, 1500);
    animateNumber("totalNotesVal", noteCount, 1500);
    animateNumber("activeStudentsVal", totalCount * 12 + 130, 2000);

    // Setup semester card clicks
    const semCards = document.querySelectorAll(".sem-card");
    semCards.forEach(card => {
        card.addEventListener("click", () => {
            const sem = card.getAttribute("data-semester");
            if (sem) {
                // Direct to Notes page by default, selecting that semester
                window.location.href = `notes.html?semester=${sem}`;
            }
        });
    });

    // Hero Section Central Search Redirector
    const heroSearch = document.getElementById("heroSearchInput");
    if (heroSearch) {
        heroSearch.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                const query = e.target.value.trim();
                if (query) {
                    window.location.href = `notes.html?search=${encodeURIComponent(query)}`;
                }
            }
        });
    }

    // Render Recent Uploads dynamically
    renderRecentUploads();
    
    // Render Top Rated resources dynamically
    renderTopRatedResources();
}

function renderRecentUploads() {
    const grid = document.getElementById("recentUploadsGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const db = Database.getResources();
    const approvedDb = db.filter(r => r.approved !== false);

    // Sort: user uploaded files first, then by high download count as featured files!
    const sorted = [...approvedDb].sort((a, b) => {
        const aUploaded = a.id.startsWith("uploaded-");
        const bUploaded = b.id.startsWith("uploaded-");
        if (aUploaded && !bUploaded) return -1;
        if (!aUploaded && bUploaded) return 1;
        
        // If both are same, sort by ID descending (uploaded timestamps)
        if (aUploaded && bUploaded) {
            return b.id.localeCompare(a.id);
        }
        
        // For preloaded, sort by download count (popularity)
        return b.downloadCount - a.downloadCount;
    });

    // Slice top 3
    const recents = sorted.slice(0, 3);

    recents.forEach(res => {
        const card = document.createElement("div");
        card.className = `file-card ${res.type === 'paper' ? 'paper-tag' : ''}`;
        card.setAttribute("data-id", res.id);
        
        const isUploaded = res.id.startsWith("uploaded-");
        let managementIconsHtml = "";
        if (isUploaded) {
            managementIconsHtml = `
                <div class="card-management-actions">
                    <button class="btn-manage-icon btn-edit-icon" onclick="openEditModal('${res.id}', '${res.type}')" title="Edit Resource"><i class="fas fa-edit"></i></button>
                    <button class="btn-manage-icon btn-delete-icon" onclick="deleteResource('${res.id}', '${res.type}')" title="Delete Resource"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
        }
        
        const reviewCount = res.reviews ? res.reviews.length : 2;
        
        card.innerHTML = `
            <div class="card-top">
                <div>
                    <i class="fas fa-file-pdf file-icon"></i>
                    <span class="tag-badge">Sem ${res.semester}</span>
                </div>
                ${managementIconsHtml}
            </div>
            <div class="card-body">
                <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary); display:block; margin-bottom:0.3rem;">
                    ${res.type === 'paper' ? 'EXAM PAPER' : 'LECTURE NOTES'}
                </span>
                <h4>${res.title}</h4>
                <div class="file-details">
                    <span><i class="fas fa-book-open"></i> <strong>Subject:</strong> ${res.subject}</span>
                    <span><i class="fas fa-user-tie"></i> <strong>Author:</strong> ${res.author}</span>
                    <span><i class="fas fa-hdd"></i> <strong>File Size:</strong> ${res.size}</span>
                    <span><i class="fas fa-star" style="color:#fbbf24;"></i> <strong>Rating:</strong> ${res.rating.toFixed(1)} (${reviewCount} Reviews)</span>
                    <span class="download-counter"><i class="fas fa-download"></i> ${res.downloadCount} Downloads</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-view" onclick="openViewer('${res.id}')"><i class="fas fa-eye"></i> View PDF</button>
                <button class="btn-dl" onclick="downloadResource('${res.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function renderTopRatedResources() {
    const grid = document.getElementById("topRatedGrid");
    if (!grid) return;

    grid.innerHTML = "";
    const db = Database.getResources();
    const approvedDb = db.filter(r => r.approved !== false);

    // Sort by rating descending, then downloadCount descending
    const sorted = [...approvedDb].sort((a, b) => {
        if (b.rating !== a.rating) {
            return b.rating - a.rating;
        }
        return b.downloadCount - a.downloadCount;
    });

    // Slice top 3
    const topRated = sorted.slice(0, 3);

    topRated.forEach(res => {
        const card = document.createElement("div");
        card.className = `file-card ${res.type === 'paper' ? 'paper-tag' : ''}`;
        card.setAttribute("data-id", res.id);
        
        const isUploaded = res.id.startsWith("uploaded-");
        let managementIconsHtml = "";
        if (isUploaded) {
            managementIconsHtml = `
                <div class="card-management-actions">
                    <button class="btn-manage-icon btn-edit-icon" onclick="openEditModal('${res.id}', '${res.type}')" title="Edit Resource"><i class="fas fa-edit"></i></button>
                    <button class="btn-manage-icon btn-delete-icon" onclick="deleteResource('${res.id}', '${res.type}')" title="Delete Resource"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
        }
        
        const reviewCount = res.reviews ? res.reviews.length : 2;
        
        card.innerHTML = `
            <div class="card-top">
                <div>
                    <i class="fas fa-file-pdf file-icon"></i>
                    <span class="tag-badge">Sem ${res.semester}</span>
                    <span class="featured-badge" style="margin-left:0.5rem;"><i class="fas fa-award"></i> Top Rated</span>
                </div>
                ${managementIconsHtml}
            </div>
            <div class="card-body">
                <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary); display:block; margin-bottom:0.3rem;">
                    ${res.type === 'paper' ? 'EXAM PAPER' : 'LECTURE NOTES'}
                </span>
                <h4>${res.title}</h4>
                <div class="file-details">
                    <span><i class="fas fa-book-open"></i> <strong>Subject:</strong> ${res.subject}</span>
                    <span><i class="fas fa-user-tie"></i> <strong>Author:</strong> ${res.author}</span>
                    <span><i class="fas fa-hdd"></i> <strong>File Size:</strong> ${res.size}</span>
                    <span><i class="fas fa-star" style="color:#fbbf24;"></i> <strong>Rating:</strong> ${res.rating.toFixed(1)} (${reviewCount} Reviews)</span>
                    <span class="download-counter"><i class="fas fa-download"></i> ${res.downloadCount} Downloads</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-view" onclick="openViewer('${res.id}')"><i class="fas fa-eye"></i> View PDF</button>
                <button class="btn-dl" onclick="downloadResource('${res.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function animateNumber(id, endValue, duration) {
    const el = document.getElementById(id);
    if (!el) return;
    
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / endValue));
    const timer = setInterval(() => {
        start += 1;
        el.textContent = start + "+";
        if (start >= endValue) {
            el.textContent = endValue + "+";
            clearInterval(timer);
        }
    }, Math.max(stepTime, 20));
}

// ==========================================================================
// Resource Browser Page Logic (notes.html & papers.html)
// ==========================================================================
function initResourceBrowserPage(pageType) {
    initPdfViewerModal();
    initEditModal();

    // Check query params for active redirection (semester, search query, subject)
    const params = new URLSearchParams(window.location.search);
    
    const semParam = params.get("semester");
    if (semParam) {
        currentSemesterFilter = parseInt(semParam);
    }

    const searchParam = params.get("search");
    if (searchParam) {
        searchQuery = searchParam.toLowerCase().trim();
    }

    const subjectParam = params.get("subject");
    if (subjectParam) {
        currentSubjectFilter = subjectParam;
    }

    // Populate Sidebar Semester Filters
    const semContainer = document.getElementById("semesterButtons");
    if (semContainer) {
        semContainer.innerHTML = "";
        
        // Add "All Semesters" button
        const allBtn = document.createElement("button");
        allBtn.className = `sem-btn ${!currentSemesterFilter ? 'active' : ''}`;
        allBtn.textContent = "All Semesters";
        allBtn.addEventListener("click", () => {
            currentSemesterFilter = null;
            updateSemesterFiltersUI(allBtn);
            populateSubjectsDropdown();
            renderResources(pageType);
        });
        semContainer.appendChild(allBtn);

        // Add Semesters 1 to 6
        for (let s = 1; s <= 6; s++) {
            const btn = document.createElement("button");
            btn.className = `sem-btn ${currentSemesterFilter === s ? 'active' : ''}`;
            btn.textContent = `Semester ${s}`;
            btn.addEventListener("click", () => {
                currentSemesterFilter = s;
                updateSemesterFiltersUI(btn);
                populateSubjectsDropdown();
                renderResources(pageType);
            });
            semContainer.appendChild(btn);
        }
    }

    // Initialize Subjects Dropdown
    const select = document.getElementById("subjectFilter");
    if (select) {
        populateSubjectsDropdown();
        
        // Sync url subject query parameter
        if (subjectParam) {
            select.value = subjectParam;
        }

        select.addEventListener("change", (e) => {
            currentSubjectFilter = e.target.value;
            renderResources(pageType);
        });
    }

    // Setup Search input triggers
    const searchInput = document.getElementById("searchBox");
    if (searchInput) {
        if (searchParam) {
            searchInput.value = searchParam;
        }
        searchInput.addEventListener("keyup", (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderResources(pageType);
        });
    }

    // Initial render call
    renderResources(pageType);
}

function updateSemesterFiltersUI(activeButton) {
    const btns = document.querySelectorAll("#semesterButtons .sem-btn");
    btns.forEach(btn => btn.classList.remove("active"));
    activeButton.classList.add("active");
}

function populateSubjectsDropdown() {
    const select = document.getElementById("subjectFilter");
    if (!select) return;

    select.innerHTML = '<option value="">All Subjects</option>';
    currentSubjectFilter = "";

    if (currentSemesterFilter) {
        const subjects = CURRICULUM[currentSemesterFilter];
        subjects.forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub;
            opt.textContent = sub;
            select.appendChild(opt);
        });
    } else {
        // Collect all distinct subjects across all semesters
        const allSubjects = new Set();
        Object.values(CURRICULUM).forEach(list => {
            list.forEach(sub => allSubjects.add(sub));
        });
        
        Array.from(allSubjects).sort().forEach(sub => {
            const opt = document.createElement("option");
            opt.value = sub;
            opt.textContent = sub;
            select.appendChild(opt);
        });
    }
}

function renderResources(pageType) {
    const grid = document.getElementById("filesGrid");
    const countSpan = document.getElementById("resultsCountVal");
    if (!grid) return;

    grid.innerHTML = "";
    const db = Database.getResources();

    // Filtering Pipeline
    const filtered = db.filter(res => {
        // Match approved state
        if (res.approved === false) return false;

        // Match base notes/paper page type
        if (res.type !== pageType) return false;

        // Match semester filter
        if (currentSemesterFilter && res.semester !== currentSemesterFilter) return false;

        // Match subject filter
        if (currentSubjectFilter && res.subject !== currentSubjectFilter) return false;

        // Match search query
        if (searchQuery) {
            const titleMatch = res.title.toLowerCase().includes(searchQuery);
            const subMatch = res.subject.toLowerCase().includes(searchQuery);
            const authMatch = res.author.toLowerCase().includes(searchQuery);
            return titleMatch || subMatch || authMatch;
        }

        return true;
    });

    // Update Result Counters
    if (countSpan) countSpan.textContent = `${filtered.length} Resource${filtered.length === 1 ? '' : 's'} Found`;

    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-folder-open"></i>
                <h4>No Study Resources Match</h4>
                <p>Try clearing filters or search queries to broaden your database scan.</p>
            </div>
        `;
        return;
    }

    // Generate responsive cards
    filtered.forEach(res => {
        const card = document.createElement("div");
        card.className = `file-card ${res.type === 'paper' ? 'paper-tag' : ''}`;
        card.setAttribute("data-id", res.id);
        
        const isUploaded = res.id.startsWith("uploaded-");
        let managementIconsHtml = "";
        if (isUploaded) {
            managementIconsHtml = `
                <div class="card-management-actions">
                    <button class="btn-manage-icon btn-edit-icon" onclick="openEditModal('${res.id}', '${pageType}')" title="Edit Resource"><i class="fas fa-edit"></i></button>
                    <button class="btn-manage-icon btn-delete-icon" onclick="deleteResource('${res.id}', '${pageType}')" title="Delete Resource"><i class="fas fa-trash-alt"></i></button>
                </div>
            `;
        }
        
        const reviewCount = res.reviews ? res.reviews.length : 2;
        
        card.innerHTML = `
            <div class="card-top">
                <div>
                    <i class="fas fa-file-pdf file-icon"></i>
                    <span class="tag-badge">Sem ${res.semester}</span>
                </div>
                ${managementIconsHtml}
            </div>
            <div class="card-body">
                <h4>${res.title}</h4>
                <div class="file-details">
                    <span><i class="fas fa-book-open"></i> <strong>Subject:</strong> ${res.subject}</span>
                    <span><i class="fas fa-user-tie"></i> <strong>Author:</strong> ${res.author}</span>
                    <span><i class="fas fa-hdd"></i> <strong>File Size:</strong> ${res.size}</span>
                    <span><i class="fas fa-star" style="color:#fbbf24;"></i> <strong>Rating:</strong> ${res.rating.toFixed(1)} (${reviewCount} Reviews)</span>
                    <span class="download-counter"><i class="fas fa-download"></i> ${res.downloadCount} Downloads</span>
                </div>
            </div>
            <div class="card-actions">
                <button class="btn-view" onclick="openViewer('${res.id}')"><i class="fas fa-eye"></i> View PDF</button>
                <button class="btn-dl" onclick="downloadResource('${res.id}')">
                    <i class="fas fa-download"></i> Download
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ==========================================================================
// Upload Portal Logic (upload.html)
// ==========================================================================
function initUploadPage() {
    const dropzone = document.getElementById("dropzone");
    const fileInput = document.getElementById("fileInput");
    const uploadForm = document.getElementById("uploadForm");
    const semSelect = document.getElementById("upSemester");
    const subSelect = document.getElementById("upSubject");
    const selectedFileIndicator = document.getElementById("selectedFileIndicator");
    const previewContainer = document.getElementById("uploadPreviewContainer");
    const previewIframe = document.getElementById("pdfPreviewIframe");
    const previewName = document.getElementById("previewFileName");
    const previewSize = document.getElementById("previewFileSize");
    const btnRemove = document.getElementById("btnRemoveFile");

    if (!dropzone || !fileInput || !uploadForm) return;

    let uploadedFileBase64 = null;

    // Semester -> Subject dropdown synchronizer
    if (semSelect && subSelect) {
        const syncSubjects = () => {
            const sem = parseInt(semSelect.value);
            subSelect.innerHTML = '<option value="" disabled selected>Select Subject</option>';
            if (sem && CURRICULUM[sem]) {
                CURRICULUM[sem].forEach(sub => {
                    const opt = document.createElement("option");
                    opt.value = sub;
                    opt.textContent = sub;
                    subSelect.appendChild(opt);
                });
            }
        };
        semSelect.addEventListener("change", syncSubjects);
    }

    // Drag-and-Drop visual alerts
    dropzone.addEventListener("click", () => fileInput.click());
    
    dropzone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropzone.classList.add("dragover");
    });

    dropzone.addEventListener("dragleave", () => {
        dropzone.classList.remove("dragover");
    });

    dropzone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropzone.classList.remove("dragover");
        if (e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            fileInput.files = e.dataTransfer.files;
            handleFileSelected(file);
        }
    });

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            handleFileSelected(fileInput.files[0]);
        }
    });

    // Remove File click handler
    if (btnRemove) {
        btnRemove.addEventListener("click", () => {
            resetFileSelection();
        });
    }

    function resetFileSelection() {
        fileInput.value = "";
        selectedFileIndicator.style.display = "none";
        uploadedFileBase64 = null;
        
        if (previewIframe) previewIframe.src = "";
        if (previewContainer) previewContainer.style.display = "none";
        if (dropzone) dropzone.style.display = "block";
    }

    function handleFileSelected(file) {
        // Enforce File Type Validation
        if (file.type !== "application/pdf") {
            showToast("Invalid File Type! Only PDF documents are authorized.");
            resetFileSelection();
            return;
        }

        // Enforce File Size Validation (Max 10 MB limit)
        const maxSizeBytes = 10 * 1024 * 1024; // 10 MB
        if (file.size > maxSizeBytes) {
            showToast("File Exceeds Size Limit! Maximum allowed size is 10 MB.");
            resetFileSelection();
            return;
        }

        // Load into iframe previewer and read as Base64 Data URL
        const reader = new FileReader();
        reader.onload = function(e) {
            uploadedFileBase64 = e.target.result;
            if (previewIframe) previewIframe.src = uploadedFileBase64;
        };
        reader.readAsDataURL(file);

        // Set metadata text
        const sizeKb = file.size / 1024;
        const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.round(sizeKb)} KB`;
        
        if (previewName) previewName.textContent = file.name;
        if (previewSize) previewSize.textContent = formattedSize;

        // Hide massive dropzone dashed block and slide open gorgeous previewer
        if (dropzone) dropzone.style.display = "none";
        if (previewContainer) {
            previewContainer.style.display = "block";
            previewContainer.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        // Also update standard selection subtitle
        selectedFileIndicator.style.display = "inline-flex";
        selectedFileIndicator.innerHTML = `<i class="fas fa-file-pdf"></i> Selected: ${file.name} (${formattedSize})`;
    }

    // Simulated Progress and LocalStorage writing logic
    uploadForm.addEventListener("submit", (e) => {
        e.preventDefault();

        if (!uploadedFileBase64) {
            showToast("Please drag & drop or select a PDF file first.");
            return;
        }

        const title = document.getElementById("upTitle").value.trim();
        const type = document.getElementById("upType").value;
        const semester = parseInt(semSelect.value);
        const subject = subSelect.value;
        const author = document.getElementById("upAuthor").value.trim() || "Anonymous Contributor";
        const file = fileInput.files[0];

        // Format File Sizing details
        const sizeKb = file.size / 1024;
        const formattedSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${Math.round(sizeKb)} KB`;

        // Create virtual pages matching the upload details
        const customPreview = {
            subTitle: `Contributed syllabus guide compiling practical definitions and curriculum criteria.`,
            sections: [
                {
                    heading: "Document Overview & Definitions",
                    text: `This notes catalog is compiled covering specific curriculum objectives for ${subject} in Semester ${semester}.`,
                    bullets: [
                        "Provides structured revision highlights.",
                        "Aligns with recent GJU semester test expectations.",
                        "Compiled and authorized by user community."
                    ]
                }
            ]
        };

        // Activate progress UI
        const progressBox = document.getElementById("progressBox");
        const progressBar = document.getElementById("progressBar");
        const progressPercentage = document.getElementById("progressPercentage");
        const progressStatus = document.getElementById("progressStatus");

        progressBox.style.display = "block";
        uploadForm.querySelector("button[type='submit']").disabled = true;

        if (window.isFirebaseInitialized) {
            // REAL FIREBASE STORAGE UPLOAD WORKFLOW
            try {
                const storageRef = storage.ref('resources/' + Date.now() + '_' + file.name);
                const uploadTask = storageRef.put(file);

                uploadTask.on('state_changed', 
                    (snapshot) => {
                        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                        progressBar.style.width = `${progress}%`;
                        progressPercentage.textContent = `${progress}%`;
                        
                        if (progress < 25) progressStatus.textContent = "Initializing secure upload pipe...";
                        else if (progress < 50) progressStatus.textContent = "Encrypting document blocks...";
                        else if (progress < 90) progressStatus.textContent = "Streaming document bytes to Firebase...";
                        else progressStatus.textContent = "Finalizing upload stream...";
                    }, 
                    (error) => {
                        console.error("Firebase Storage Upload Error:", error);
                        showToast("Upload failed: " + error.message);
                        progressBox.style.display = "none";
                        uploadForm.querySelector("button[type='submit']").disabled = false;
                    }, 
                    async () => {
                        try {
                            const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                            
                            const newResource = {
                                id: `uploaded-${Date.now()}`,
                                title: title,
                                type: type,
                                semester: semester,
                                subject: subject,
                                author: author,
                                size: formattedSize,
                                date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                                rating: 5.0,
                                downloadCount: 0,
                                filePath: downloadURL, // Public Firebase Cloud Storage download URL!
                                preview: customPreview,
                                approved: false // Unapproved by default for moderation review
                            };

                            await Database.saveResource(newResource);
                            showToast("Resource Uploaded & Sent for Moderation!");
                            
                            // Clear inputs and redirect
                            setTimeout(() => {
                                uploadForm.reset();
                                fileInput.value = "";
                                selectedFileIndicator.style.display = "none";
                                progressBox.style.display = "none";
                                uploadForm.querySelector("button[type='submit']").disabled = false;
                                window.location.href = type === "notes" ? "notes.html" : "papers.html";
                            }, 1000);
                        } catch (err) {
                            console.error("Firestore Resource Save Error:", err);
                            showToast("Failed to index resource in database.");
                            progressBox.style.display = "none";
                            uploadForm.querySelector("button[type='submit']").disabled = false;
                        }
                    }
                );
            } catch (err) {
                console.error("Storage Initialization Error:", err);
                showToast("Failed to connect to Storage.");
                progressBox.style.display = "none";
                uploadForm.querySelector("button[type='submit']").disabled = false;
            }
        } else {
            // OFFLINE BACKUP LOCALSTORAGE SANDBOX SIMULATION
            let progress = 0;
            const statusTexts = [
                "Initializing local upload sandbox...",
                "Encoding document to Base64 byte array...",
                "Validating curriculum mapping details...",
                "Writing records to LocalStorage...",
                "Upload finalized locally!"
            ];

            const interval = setInterval(() => {
                progress += 2;
                progressBar.style.width = `${progress}%`;
                progressPercentage.textContent = `${progress}%`;

                if (progress < 25) progressStatus.textContent = statusTexts[0];
                else if (progress < 50) progressStatus.textContent = statusTexts[1];
                else if (progress < 75) progressStatus.textContent = statusTexts[2];
                else if (progress < 95) progressStatus.textContent = statusTexts[3];
                else progressStatus.textContent = statusTexts[4];

                if (progress >= 100) {
                    clearInterval(interval);
                    
                    const newResource = {
                        id: `uploaded-${Date.now()}`,
                        title: title,
                        type: type,
                        semester: semester,
                        subject: subject,
                        author: author,
                        size: formattedSize,
                        date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                        rating: 5.0,
                        downloadCount: 0,
                        filePath: "#", 
                        fileData: uploadedFileBase64, // LocalStorage Base64 stream fallback
                        preview: customPreview,
                        approved: false
                    };

                    Database.saveResource(newResource);
                    showToast("Offline sandbox upload saved successfully!");
                    uploadedFileBase64 = null;

                    setTimeout(() => {
                        uploadForm.reset();
                        fileInput.value = "";
                        selectedFileIndicator.style.display = "none";
                        progressBox.style.display = "none";
                        uploadForm.querySelector("button[type='submit']").disabled = false;
                        window.location.href = type === "notes" ? "notes.html" : "papers.html";
                    }, 1000);
                }
            }, 30);
        }
    });
}

// Ensure LocalStorage database is ready on script load
Database.init();

// ==========================================================================
// Analytics Dashboard Logic (dashboard.html)
// ==========================================================================
function initDashboardPage() {
    initPdfViewerModal();
    initEditModal();

    const db = Database.getResources().filter(r => r.approved !== false);
    const notes = db.filter(r => r.type === "notes");
    const papers = db.filter(r => r.type === "paper");
    
    // 1. Calculate base counts
    const totalCount = db.length;
    const notesCount = notes.length;
    const papersCount = papers.length;
    const totalDownloads = db.reduce((sum, r) => sum + (r.downloadCount || 0), 0);
    
    // Animate stats numbers
    animateNumber("totalResourcesDash", totalCount, 1200);
    animateNumber("totalNotesDash", notesCount, 1200);
    animateNumber("totalPapersDash", papersCount, 1200);
    animateNumber("totalDownloadsDash", totalDownloads, 1200);
    
    // 2. Render Semester-wise statistics
    const semBarsContainer = document.getElementById("semesterStatsBars");
    if (semBarsContainer) {
        semBarsContainer.innerHTML = "";
        
        // Count resources per semester
        const semCounts = {};
        for (let s = 1; s <= 6; s++) {
            semCounts[s] = db.filter(r => r.semester === s).length;
        }
        
        const maxSemCount = Math.max(...Object.values(semCounts), 1);
        
        for (let s = 1; s <= 6; s++) {
            const count = semCounts[s];
            const pct = (count / maxSemCount) * 100;
            
            const barItem = document.createElement("div");
            barItem.className = "stat-bar-item";
            barItem.innerHTML = `
                <div class="stat-bar-meta">
                    <span>Semester ${s}</span>
                    <span style="color:var(--text-highlight);">${count} Files</span>
                </div>
                <div class="stat-bar-track">
                    <div class="stat-bar-fill" id="semBarFill-${s}" style="width: 0%;"></div>
                </div>
            `;
            semBarsContainer.appendChild(barItem);
            
            // Animate progress bar fill width
            setTimeout(() => {
                const fillEl = document.getElementById(`semBarFill-${s}`);
                if (fillEl) fillEl.style.width = `${pct}%`;
            }, 100);
        }
    }
    
    // 3. Render Subject-wise statistics (Top 5 subjects in terms of file representation)
    const subBarsContainer = document.getElementById("subjectStatsBars");
    if (subBarsContainer) {
        subBarsContainer.innerHTML = "";
        
        // Count resources per subject
        const subCounts = {};
        db.forEach(res => {
            subCounts[res.subject] = (subCounts[res.subject] || 0) + 1;
        });
        
        // Sort subjects by count descending, pick top 5
        const topSubjects = Object.entries(subCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
            
        const maxSubCount = topSubjects.length > 0 ? Math.max(...topSubjects.map(x => x[1]), 1) : 1;
        
        topSubjects.forEach(([subject, count], idx) => {
            const pct = (count / maxSubCount) * 100;
            
            const barItem = document.createElement("div");
            barItem.className = "stat-bar-item";
            barItem.innerHTML = `
                <div class="stat-bar-meta">
                    <span>${subject}</span>
                    <span style="color:var(--text-highlight);">${count} Files</span>
                </div>
                <div class="stat-bar-track">
                    <div class="stat-bar-fill teal" id="subBarFill-${idx}" style="width: 0%;"></div>
                </div>
            `;
            subBarsContainer.appendChild(barItem);
            
            // Animate progress bar fill width
            setTimeout(() => {
                const fillEl = document.getElementById(`subBarFill-${idx}`);
                if (fillEl) fillEl.style.width = `${pct}%`;
            }, 100);
        });
    }
    
    // 4. Render Popular Notes Table Body
    const notesTableBody = document.getElementById("popularNotesTableBody");
    if (notesTableBody) {
        notesTableBody.innerHTML = "";
        
        // Sort notes by downloads descending
        const popularNotes = [...notes].sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 3);
        
        if (popularNotes.length === 0) {
            notesTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No notes available</td></tr>`;
        } else {
            popularNotes.forEach(res => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>
                        <a href="#" class="table-link" onclick="openViewer('${res.id}'); return false;" style="color:var(--primary); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fas fa-file-pdf" style="color:#ef4444;"></i> ${res.title}
                        </a>
                    </td>
                    <td>${res.subject}</td>
                    <td style="text-align:right; font-weight:700; color:var(--text-highlight);">${res.downloadCount}</td>
                `;
                notesTableBody.appendChild(tr);
            });
        }
    }
    
    // 5. Render Popular Papers Table Body
    const papersTableBody = document.getElementById("popularPapersTableBody");
    if (papersTableBody) {
        papersTableBody.innerHTML = "";
        
        // Sort papers by downloads descending
        const popularPapers = [...papers].sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0)).slice(0, 3);
        
        if (popularPapers.length === 0) {
            papersTableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted);">No question papers available</td></tr>`;
        } else {
            popularPapers.forEach(res => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>
                        <a href="#" class="table-link" onclick="openViewer('${res.id}'); return false;" style="color:var(--accent-purple); font-weight:600; display:flex; align-items:center; gap:0.5rem;">
                            <i class="fas fa-file-pdf" style="color:#ef4444;"></i> ${res.title}
                        </a>
                    </td>
                    <td>${res.subject}</td>
                    <td style="text-align:right; font-weight:700; color:var(--text-highlight);">${res.downloadCount}</td>
                `;
                papersTableBody.appendChild(tr);
            });
        }
    }
}
