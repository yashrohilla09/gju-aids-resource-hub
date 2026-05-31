/* ==========================================================================
   GJU AI&DS Resource Hub - Admin Panel Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", async () => {
    // Initialize admin session state
    const sessionData = localStorage.getItem("gju_admin_session");
    if (!sessionData) {
        window.location.replace("admin-login.html");
        return;
    }
    
    // Ensure Database is initialized from Firestore before rendering
    if (window.Database) {
        await Database.init();
    }
    
    const session = JSON.parse(sessionData);
    
    // 1. Profile bindings
    const welcomeGreeting = document.getElementById("welcomeGreeting");
    if (welcomeGreeting) {
        welcomeGreeting.textContent = `Welcome back, ${session.name || 'Admin'}!`;
    }
    
    const adminProfileName = document.getElementById("adminProfileName");
    if (adminProfileName) {
        adminProfileName.textContent = session.name || "Yash Rohil";
    }
    
    const avatarBlock = document.getElementById("avatarBlock");
    if (avatarBlock && session.name) {
        const initials = session.name.split(" ").map(w => w[0]).join("").toUpperCase();
        avatarBlock.textContent = initials || "YR";
    }

    // 2. Set current date/time
    const currentLiveDate = document.getElementById("currentLiveDate");
    if (currentLiveDate) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentLiveDate.textContent = new Date().toLocaleDateString("en-US", options);
    }

    // 3. Tab switching mechanisms
    const menuItems = document.querySelectorAll(".sidebar-menu .menu-item[data-tab]");
    const tabContents = document.querySelectorAll(".admin-main .tab-content");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            const targetTab = item.getAttribute("data-tab");
            
            // Toggle active classes in menu
            menuItems.forEach(m => m.classList.remove("active"));
            item.classList.add("active");
            
            // Toggle active tab content
            tabContents.forEach(content => content.classList.remove("active"));
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add("active");
            }
            
            // Refresh that specific tab's dynamic data
            refreshActiveTab(targetTab);
        });
    });

    // 4. Return to Hub & Logout Handlers
    const btnReturnToHub = document.getElementById("btnReturnToHub");
    if (btnReturnToHub) {
        btnReturnToHub.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

    const btnLogoutAdmin = document.getElementById("btnLogoutAdmin");
    if (btnLogoutAdmin) {
        btnLogoutAdmin.addEventListener("click", async () => {
            if (confirm("Are you sure you want to end your administrative session?")) {
                if (window.isFirebaseInitialized && window.auth) {
                    try {
                        await auth.signOut();
                    } catch (e) {
                        console.error("Firebase SignOut Error:", e);
                    }
                }
                localStorage.removeItem("gju_admin_session");
                showToast("Logged out successfully.");
                setTimeout(() => {
                    window.location.replace("admin-login.html");
                }, 800);
            }
        });
    }

    // 5. Global Theme Toggle Support
    const themeBtn = document.getElementById("themeToggleBtn");
    const currentTheme = localStorage.getItem("gju_theme") || "dark";
    
    // Initial sync
    if (currentTheme === "light") {
        document.body.classList.add("light-theme");
        if (themeBtn) themeBtn.querySelector("i").className = "fas fa-sun";
    } else {
        document.body.classList.remove("light-theme");
        if (themeBtn) themeBtn.querySelector("i").className = "fas fa-moon";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("light-theme");
            const isLight = document.body.classList.contains("light-theme");
            localStorage.setItem("gju_theme", isLight ? "light" : "dark");
            themeBtn.querySelector("i").className = isLight ? "fas fa-sun" : "fas fa-moon";
            showToast(`${isLight ? 'Light' : 'Dark'} Theme Activated!`);
        });
    }

    // ==========================================================================
    // Dynamic Tab Data Handlers
    // ==========================================================================

    function refreshActiveTab(tabId) {
        updatePendingBadgeCount(); // Sync sidebar badge on every click
        
        switch (tabId) {
            case "tab-overview":
                renderOverviewTab();
                break;
            case "tab-curriculum":
                renderCurriculumTab();
                break;
            case "tab-resources":
                renderResourcesTab();
                break;
            case "tab-moderation":
                renderModerationTab();
                break;
            case "tab-users":
                renderUsersTab();
                break;
        }
    }

    // Unified helper to keep the moderation badge synced
    function updatePendingBadgeCount() {
        const db = Database.getResources();
        const pendingCount = db.filter(r => r.approved === false).length;
        const badge = document.getElementById("pendingModerationBadge");
        if (badge) {
            badge.textContent = pendingCount;
            badge.style.display = pendingCount > 0 ? "inline-block" : "none";
        }
        return pendingCount;
    }

    // --------------------------------------------------------------------------
    // Tab 1: Overview Panel
    // --------------------------------------------------------------------------
    function renderOverviewTab() {
        const db = Database.getResources();
        const users = Database.getUsers();
        
        const totalApproved = db.filter(r => r.approved !== false).length;
        const totalPending = db.filter(r => r.approved === false).length;
        
        // Calculate curriculum subjects count
        const curriculum = Database.getCurriculum();
        let totalSubjects = 0;
        Object.values(curriculum).forEach(subList => totalSubjects += subList.length);
        
        document.getElementById("ovrTotalFiles").textContent = totalApproved;
        document.getElementById("ovrTotalSubjects").textContent = totalSubjects;
        document.getElementById("ovrPendingUploads").textContent = totalPending;
        document.getElementById("ovrTotalAccounts").textContent = users.length;

        // Render mini pending uploads preview
        const overviewPendingBody = document.getElementById("overviewPendingBody");
        if (overviewPendingBody) {
            overviewPendingBody.innerHTML = "";
            const pendingList = db.filter(r => r.approved === false).slice(0, 3);
            
            if (pendingList.length === 0) {
                overviewPendingBody.innerHTML = `<tr><td colspan="3" style="text-align:center; color:var(--text-muted); font-size:0.8rem; padding:1.5rem;">No unmoderated uploads in queue.</td></tr>`;
            } else {
                pendingList.forEach(res => {
                    const tr = document.createElement("tr");
                    tr.innerHTML = `
                        <td style="font-weight:600; color:var(--text-highlight);">${res.title}</td>
                        <td>${res.subject}</td>
                        <td>
                            <button class="btn-primary" style="padding:0.3rem 0.6rem; font-size:0.7rem; border-radius:4px;" onclick="quickApprove('${res.id}')"><i class="fas fa-check"></i> Approve</button>
                        </td>
                    `;
                    overviewPendingBody.appendChild(tr);
                });
            }
        }
    }

    // Expose quickApprove function globally for easy click access
    window.quickApprove = function(resId) {
        Database.updateResource(resId, { approved: true });
        showToast("Resource approved successfully!");
        renderOverviewTab();
        updatePendingBadgeCount();
    };

    // --------------------------------------------------------------------------
    // Tab 2: Curriculum Management (Subject Configs)
    // --------------------------------------------------------------------------
    function renderCurriculumTab() {
        const curriculum = Database.getCurriculum();
        const container = document.getElementById("curriculumSemesterGrid");
        if (!container) return;
        
        container.innerHTML = "";
        
        for (let sem = 1; sem <= 6; sem++) {
            const subjects = curriculum[sem] || [];
            const card = document.createElement("div");
            card.className = "sem-edit-card";
            
            let subjectsListHtml = "";
            if (subjects.length === 0) {
                subjectsListHtml = `<p style="color:var(--text-muted); font-size:0.8rem; font-style:italic;">No subjects configured.</p>`;
            } else {
                subjects.forEach(sub => {
                    subjectsListHtml += `
                        <div class="subject-tag-item">
                            <span style="font-weight:500; color:var(--text-highlight);">${sub}</span>
                            <div class="subject-actions">
                                <button class="btn-inline-icon edit" onclick="openEditSubjectModal(${sem}, '${sub.replace(/'/g, "\\'")}')" title="Edit Name"><i class="fas fa-edit"></i></button>
                                <button class="btn-inline-icon delete" onclick="deleteSubject(${sem}, '${sub.replace(/'/g, "\\'")}')" title="Delete Course"><i class="fas fa-trash-alt"></i></button>
                            </div>
                        </div>
                    `;
                });
            }
            
            card.innerHTML = `
                <div class="sem-card-header">
                    <h3><i class="fas fa-layer-group" style="color:var(--primary);"></i> Semester ${sem}</h3>
                    <span style="font-size:0.75rem; color:var(--secondary); font-weight:700;">${subjects.length} Courses</span>
                </div>
                <div class="subject-tag-list">
                    ${subjectsListHtml}
                </div>
            `;
            container.appendChild(card);
        }
    }

    // Modal launchers
    const btnAddNewSubjectModal = document.getElementById("btnAddNewSubjectModal");
    if (btnAddNewSubjectModal) {
        btnAddNewSubjectModal.addEventListener("click", () => {
            document.getElementById("subjectMode").value = "add";
            document.getElementById("subjectModalTitle").innerHTML = `<i class="fas fa-plus-circle" style="color:var(--primary);"></i> Add Course Subject`;
            document.getElementById("subSemesterSelect").disabled = false;
            document.getElementById("subSemesterSelect").value = "1";
            document.getElementById("subjectNameInput").value = "";
            document.getElementById("subjectModal").style.display = "flex";
        });
    }

    window.openEditSubjectModal = function(semester, subjectName) {
        document.getElementById("subjectMode").value = "edit";
        document.getElementById("subjectModalTitle").innerHTML = `<i class="fas fa-edit" style="color:var(--primary);"></i> Edit Course Subject`;
        document.getElementById("subSemesterSelect").value = semester;
        document.getElementById("subSemesterSelect").disabled = true; // Disable semester move from within edit to keep it clean, or allow it
        document.getElementById("subjectNameInput").value = subjectName;
        document.getElementById("originalSubjectName").value = subjectName;
        document.getElementById("originalSemester").value = semester;
        document.getElementById("subjectModal").style.display = "flex";
    };

    window.deleteSubject = function(semester, subjectName) {
        if (confirm(`Are you sure you want to delete "${subjectName}" from Semester ${semester}? This will remove it from the curriculum options.`)) {
            const curriculum = Database.getCurriculum();
            if (curriculum[semester]) {
                curriculum[semester] = curriculum[semester].filter(s => s !== subjectName);
                Database.saveCurriculum(curriculum);
                showToast("Subject deleted from curriculum.");
                renderCurriculumTab();
            }
        }
    };

    // Subject Form Submit Handler
    const subjectForm = document.getElementById("subjectForm");
    if (subjectForm) {
        subjectForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const mode = document.getElementById("subjectMode").value;
            const targetSem = parseInt(document.getElementById("subSemesterSelect").value);
            const subName = document.getElementById("subjectNameInput").value.trim();
            
            if (!subName) return;

            const curriculum = Database.getCurriculum();

            if (mode === "add") {
                if (!curriculum[targetSem]) curriculum[targetSem] = [];
                if (curriculum[targetSem].includes(subName)) {
                    alert("This subject already exists in this semester.");
                    return;
                }
                curriculum[targetSem].push(subName);
                Database.saveCurriculum(curriculum);
                showToast("Subject added successfully!");
            } else {
                const originalSem = parseInt(document.getElementById("originalSemester").value);
                const originalName = document.getElementById("originalSubjectName").value;

                // Edit name in curriculum
                if (curriculum[originalSem]) {
                    const idx = curriculum[originalSem].indexOf(originalName);
                    if (idx !== -1) {
                        curriculum[originalSem][idx] = subName;
                    }
                }
                Database.saveCurriculum(curriculum);

                // Cascade updates to all existing resources using this subject! (Deep database integrity!)
                const resources = Database.getResources();
                let updatedResourcesCount = 0;
                resources.forEach(res => {
                    if (res.semester === originalSem && res.subject === originalName) {
                        Database.updateResource(res.id, { subject: subName });
                        updatedResourcesCount++;
                    }
                });
                if (updatedResourcesCount > 0) {
                    console.log(`Cascaded subject name updates to ${updatedResourcesCount} resources.`);
                }

                showToast("Subject renamed successfully!");
            }

            closeAdminModal("subjectModal");
            renderCurriculumTab();
        });
    }

    // --------------------------------------------------------------------------
    // Tab 3: Resource Library Management
    // --------------------------------------------------------------------------
    let currentSearchVal = "";
    let currentSemesterFilterVal = "";

    function renderResourcesTab() {
        const db = Database.getResources();
        const approved = db.filter(r => r.approved !== false);
        const tbody = document.getElementById("resourcesTableBody");
        if (!tbody) return;
        
        tbody.innerHTML = "";

        // Search & Filter Pipeline
        const filtered = approved.filter(res => {
            if (currentSemesterFilterVal && res.semester !== parseInt(currentSemesterFilterVal)) return false;
            
            if (currentSearchVal) {
                const query = currentSearchVal.toLowerCase();
                const matchesTitle = res.title.toLowerCase().includes(query);
                const matchesSubject = res.subject.toLowerCase().includes(query);
                const matchesAuthor = res.author.toLowerCase().includes(query);
                return matchesTitle || matchesSubject || matchesAuthor;
            }
            return true;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:var(--text-muted); padding:2rem;">No matching resources indexed.</td></tr>`;
            return;
        }

        filtered.forEach(res => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="font-weight:600; color:var(--text-highlight); max-width:280px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${res.title}</td>
                <td><span style="font-weight:600;">Sem ${res.semester}</span></td>
                <td>${res.subject}</td>
                <td>
                    <span style="text-transform:uppercase; font-size:0.75rem; font-weight:700; color:${res.type === 'notes' ? 'var(--secondary)' : 'var(--accent-purple)'};">
                        ${res.type === 'notes' ? 'Notes' : 'Paper'}
                    </span>
                </td>
                <td>${res.author}</td>
                <td style="text-align:right;">
                    <div style="display:inline-flex; gap:0.4rem;">
                        <button class="btn-inline-icon edit" onclick="openEditResourceModal('${res.id}')" title="Edit Resource"><i class="fas fa-edit"></i></button>
                        <button class="btn-inline-icon delete" onclick="deleteResourceAdmin('${res.id}')" title="Delete Resource"><i class="fas fa-trash-alt"></i></button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Filter controls inside Resource Library
    const resourceSearchInput = document.getElementById("resourceSearchInput");
    if (resourceSearchInput) {
        resourceSearchInput.addEventListener("keyup", (e) => {
            currentSearchVal = e.target.value.trim();
            renderResourcesTab();
        });
    }

    const resourceFilterSemester = document.getElementById("resourceFilterSemester");
    if (resourceFilterSemester) {
        resourceFilterSemester.addEventListener("change", (e) => {
            currentSemesterFilterVal = e.target.value;
            renderResourcesTab();
        });
    }

    // Modal Launchers for Resources
    const btnAddNewResourceModal = document.getElementById("btnAddNewResourceModal");
    const resSemesterSelect = document.getElementById("resSemester");
    const resSubjectSelect = document.getElementById("resSubject");

    // Dynamic subject choices inside resource modal
    if (resSemesterSelect && resSubjectSelect) {
        const syncResSubjects = () => {
            const sem = parseInt(resSemesterSelect.value);
            resSubjectSelect.innerHTML = "";
            const curriculum = Database.getCurriculum();
            if (sem && curriculum[sem]) {
                curriculum[sem].forEach(sub => {
                    const opt = document.createElement("option");
                    opt.value = sub;
                    opt.textContent = sub;
                    resSubjectSelect.appendChild(opt);
                });
            }
        };
        resSemesterSelect.addEventListener("change", syncResSubjects);
        
        if (btnAddNewResourceModal) {
            btnAddNewResourceModal.addEventListener("click", () => {
                document.getElementById("resMode").value = "add";
                document.getElementById("resModalTitle").innerHTML = `<i class="fas fa-plus-circle" style="color:var(--primary);"></i> Add Study Resource`;
                document.getElementById("resTitle").value = "";
                document.getElementById("resSemester").value = "1";
                document.getElementById("resType").value = "notes";
                document.getElementById("resAuthor").value = "";
                syncResSubjects();
                document.getElementById("resourceModal").style.display = "flex";
            });
        }
    }

    window.openEditResourceModal = function(resId) {
        const db = Database.getResources();
        const res = db.find(r => r.id === resId);
        if (!res) return;

        document.getElementById("resMode").value = "edit";
        document.getElementById("resModalTitle").innerHTML = `<i class="fas fa-edit" style="color:var(--primary);"></i> Edit Study Resource`;
        document.getElementById("resIdInput").value = res.id;
        document.getElementById("resTitle").value = res.title;
        document.getElementById("resSemester").value = res.semester;
        document.getElementById("resType").value = res.type;
        document.getElementById("resAuthor").value = res.author;
        
        // Render semester subjects list
        const sem = res.semester;
        const subSelect = document.getElementById("resSubject");
        subSelect.innerHTML = "";
        const curriculum = Database.getCurriculum();
        if (curriculum[sem]) {
            curriculum[sem].forEach(sub => {
                const opt = document.createElement("option");
                opt.value = sub;
                opt.textContent = sub;
                if (sub === res.subject) opt.selected = true;
                subSelect.appendChild(opt);
            });
        }

        document.getElementById("resourceModal").style.display = "flex";
    };

    window.deleteResourceAdmin = function(resId) {
        if (confirm("Are you absolutely sure you want to delete this resource from the repository? This cannot be undone.")) {
            Database.deleteResource(resId);
            showToast("Resource deleted successfully!");
            renderResourcesTab();
            updatePendingBadgeCount();
        }
    };

    // Form Submission for Resources CRUD
    const resourceForm = document.getElementById("resourceForm");
    if (resourceForm) {
        resourceForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const mode = document.getElementById("resMode").value;
            const title = document.getElementById("resTitle").value.trim();
            const semester = parseInt(document.getElementById("resSemester").value);
            const subject = document.getElementById("resSubject").value;
            const type = document.getElementById("resType").value;
            const author = document.getElementById("resAuthor").value.trim() || "GJU Exam Board";

            if (!subject) {
                alert("Please add subjects to curriculum before creating resources.");
                return;
            }

            const db = Database.getResources();

            if (mode === "add") {
                // Generate and index new resource
                const customPreview = {
                    subTitle: `Official study material indexing standard learning highlights.`,
                    sections: [
                        {
                            heading: "Unit 1: Essential Coursework Parameters",
                            text: `Structured lecture handout reviewing syllabus guidelines for ${subject}.`,
                            bullets: ["Compiled and indexed by administrative panel.", "High readability standard verified.", "Authorized educational asset."]
                        }
                    ]
                };

                const newRes = {
                    id: `${type}-${Date.now()}`,
                    title: title,
                    type: type,
                    semester: semester,
                    subject: subject,
                    author: author,
                    size: "2.5 MB",
                    date: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
                    rating: 5.0,
                    downloadCount: 0,
                    filePath: "#",
                    approved: true, // Direct admin addition, auto approved
                    preview: customPreview
                };

                Database.saveResource(newRes);
                showToast("Resource added to library!");
            } else {
                const id = document.getElementById("resIdInput").value;
                Database.updateResource(id, {
                    title: title,
                    semester: semester,
                    subject: subject,
                    type: type,
                    author: author
                });
                showToast("Resource updated successfully!");
            }

            closeAdminModal("resourceModal");
            renderResourcesTab();
        });
    }

    // --------------------------------------------------------------------------
    // Tab 4: Student Upload Moderation Queue
    // --------------------------------------------------------------------------
    function renderModerationTab() {
        const db = Database.getResources();
        const pending = db.filter(r => r.approved === false);
        const grid = document.getElementById("moderationQueueGrid");
        if (!grid) return;

        grid.innerHTML = "";

        if (pending.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align:center; padding: 4rem; color:var(--text-muted); background:var(--bg-card); border: 1px solid var(--border-color); border-radius:12px;">
                    <i class="fas fa-clipboard-check" style="font-size:3rem; color:var(--secondary); margin-bottom:1rem; display:block;"></i>
                    <h4>Moderation Queue Clear!</h4>
                    <p style="margin-top:0.4rem; font-size:0.9rem;">There are no student-contributed files waiting for audit.</p>
                </div>
            `;
            return;
        }

        pending.forEach(res => {
            const card = document.createElement("div");
            card.className = "file-card";
            card.style.margin = "0";
            card.style.background = "var(--bg-card)";
            card.style.borderColor = "rgba(168, 85, 247, 0.2)";
            
            card.innerHTML = `
                <div class="card-top">
                    <div>
                        <i class="fas fa-file-pdf file-icon" style="color:#ef4444;"></i>
                        <span class="tag-badge">Sem ${res.semester}</span>
                        <span class="featured-badge" style="background:rgba(251,191,36,0.1); color:#fbbf24; border-color:rgba(251,191,36,0.2); margin-left:0.5rem;"><i class="fas fa-clock"></i> Pending Review</span>
                    </div>
                </div>
                <div class="card-body">
                    <span style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--primary); display:block; margin-bottom:0.3rem;">
                        ${res.type === 'paper' ? 'EXAM PAPER' : 'LECTURE NOTES'}
                    </span>
                    <h4 style="font-size:1.1rem; line-height:1.4; color:var(--text-highlight);">${res.title}</h4>
                    <div class="file-details" style="font-size:0.8rem; margin-top:0.8rem; display:flex; flex-direction:column; gap:0.4rem; border-top:1px solid var(--border-color); padding-top:0.6rem;">
                        <span><strong>Course:</strong> ${res.subject}</span>
                        <span><strong>Author:</strong> ${res.author}</span>
                        <span><strong>Size:</strong> ${res.size}</span>
                        <span><strong>Uploaded:</strong> ${res.date}</span>
                    </div>
                </div>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.6rem; padding:1.2rem; border-top:1px solid var(--border-color); background:rgba(4,6,12,0.2);">
                    <button class="btn-primary" style="padding:0.5rem; justify-content:center; font-size:0.8rem; height:auto; box-shadow:none;" onclick="approveUpload('${res.id}')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn-secondary" style="padding:0.5rem; justify-content:center; font-size:0.8rem; height:auto; background:rgba(239,68,68,0.1); color:#ef4444; border-color:rgba(239,68,68,0.2);" onclick="rejectUpload('${res.id}')">
                        <i class="fas fa-times"></i> Reject
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    window.approveUpload = function(resId) {
        Database.updateResource(resId, { approved: true });
        showToast("Resource Published to student libraries!");
        renderModerationTab();
        updatePendingBadgeCount();
    };

    window.rejectUpload = function(resId) {
        if (confirm("Are you sure you want to reject and permanently delete this uploaded file?")) {
            Database.deleteResource(resId);
            showToast("Contribution rejected & deleted.");
            renderModerationTab();
            updatePendingBadgeCount();
        }
    };

    // --------------------------------------------------------------------------
    // Tab 5: User Directory Management
    // --------------------------------------------------------------------------
    let currentUserSearchVal = "";

    function renderUsersTab() {
        const users = Database.getUsers();
        const tbody = document.getElementById("usersTableBody");
        if (!tbody) return;

        tbody.innerHTML = "";

        // User Search Filter
        const filtered = users.filter(user => {
            if (currentUserSearchVal) {
                const query = currentUserSearchVal.toLowerCase();
                return user.name.toLowerCase().includes(query) || user.username.toLowerCase().includes(query);
            }
            return true;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:var(--text-muted); padding:2rem;">No user profiles match.</td></tr>`;
            return;
        }

        filtered.forEach(user => {
            const isSelf = user.username === session.username;
            let actionButtonsHtml = "";
            if (isSelf) {
                actionButtonsHtml = `<span style="font-size:0.75rem; color:var(--text-muted); font-style:italic;">Active Session Self</span>`;
            } else {
                actionButtonsHtml = `
                    <div style="display:inline-flex; gap:0.4rem;">
                        <button class="btn-inline-icon edit" onclick="openEditUserModal('${user.id}')" title="Edit Profile"><i class="fas fa-edit"></i></button>
                        <button class="btn-inline-icon delete" onclick="deleteUserAdmin('${user.id}')" title="Delete User"><i class="fas fa-trash-alt"></i></button>
                    </div>
                `;
            }

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td style="font-weight:600; color:var(--text-highlight);">${user.name}</td>
                <td><code style="color:var(--secondary); font-family:monospace;">@${user.username}</code></td>
                <td>
                    <span class="badge-role ${user.role.toLowerCase()}">
                        <i class="fas ${user.role === 'Admin' ? 'fa-user-shield' : 'fa-user-graduate'}"></i> ${user.role}
                    </span>
                </td>
                <td style="text-align:right;">
                    ${actionButtonsHtml}
                </td>
            `;
            tbody.appendChild(tr);
        });
    }

    // Search trigger
    const userSearchInput = document.getElementById("userSearchInput");
    if (userSearchInput) {
        userSearchInput.addEventListener("keyup", (e) => {
            currentUserSearchVal = e.target.value.trim();
            renderUsersTab();
        });
    }

    // Modal Launchers for Users
    const btnAddNewUserModal = document.getElementById("btnAddNewUserModal");
    if (btnAddNewUserModal) {
        btnAddNewUserModal.addEventListener("click", () => {
            document.getElementById("userMode").value = "add";
            document.getElementById("userModalTitle").innerHTML = `<i class="fas fa-user-plus" style="color:var(--secondary);"></i> Create User Profile`;
            document.getElementById("userRealName").value = "";
            document.getElementById("userUsername").value = "";
            document.getElementById("userRoleSelect").value = "Student";
            document.getElementById("userModal").style.display = "flex";
        });
    }

    window.openEditUserModal = function(userId) {
        const users = Database.getUsers();
        const user = users.find(u => u.id === userId);
        if (!user) return;

        document.getElementById("userMode").value = "edit";
        document.getElementById("userModalTitle").innerHTML = `<i class="fas fa-edit" style="color:var(--secondary);"></i> Edit User Profile`;
        document.getElementById("userIdInput").value = user.id;
        document.getElementById("userRealName").value = user.name;
        document.getElementById("userUsername").value = user.username;
        document.getElementById("userRoleSelect").value = user.role;
        document.getElementById("userModal").style.display = "flex";
    };

    window.deleteUserAdmin = function(userId) {
        if (confirm("Are you sure you want to permanently delete this user account profile?")) {
            const users = Database.getUsers();
            const user = users.find(u => u.id === userId);
            if (user) {
                Database.deleteUser(user.username);
                showToast("User profile deleted.");
                renderUsersTab();
            }
        }
    };

    // User Form Submit Handler
    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const mode = document.getElementById("userMode").value;
            const realName = document.getElementById("userRealName").value.trim();
            const username = document.getElementById("userUsername").value.trim().toLowerCase();
            const role = document.getElementById("userRoleSelect").value;

            if (!realName || !username) return;

            const users = Database.getUsers();

            if (mode === "add") {
                // Ensure unique username
                if (users.some(u => u.username === username)) {
                    alert("This username already exists.");
                    return;
                }

                const newUser = {
                    id: `user-${Date.now()}`,
                    username: username,
                    name: realName,
                    role: role
                };
                Database.saveUser(newUser);
                showToast("User Profile Created!");
            } else {
                const id = document.getElementById("userIdInput").value;
                const idx = users.findIndex(u => u.id === id);
                if (idx !== -1) {
                    // Ensure username stays unique
                    if (users.some((u, i) => u.username === username && i !== idx)) {
                        alert("This username already exists.");
                        return;
                    }

                    const oldUsername = users[idx].username;
                    if (oldUsername !== username) {
                        Database.deleteUser(oldUsername);
                    }

                    const updatedUser = {
                        id: id,
                        username: username,
                        name: realName,
                        role: role
                    };
                    Database.saveUser(updatedUser);
                    showToast("User profile updated successfully.");
                }
            }

            closeAdminModal("userModal");
            renderUsersTab();
        });
    }

    // ==========================================================================
    // Initial Load Call Execution
    // ==========================================================================
    refreshActiveTab("tab-overview");
});
