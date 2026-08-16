let portfolioData = {};

function getSkillClass(category) {
    if (category === 'analytics') return 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/30';
    if (category === 'ai') return 'bg-blue-950/70 text-blue-300 border border-blue-500/30';
    return 'bg-purple-950/70 text-purple-300 border border-purple-500/30';
}

function createSkillBadges(skillsArray, category) {
    return skillsArray.map(skill => `<span class="px-2.5 py-1 text-xs font-mono font-medium rounded-md ${getSkillClass(category)}">${skill}</span>`).join('');
}

function toggleContactForm(show) {
    const modal = document.getElementById('contactModal');
    if (modal) modal.style.display = show ? 'flex' : 'none';
}

function toggleArchiveModal(show) {
    const modal = document.getElementById('archiveModal');
    if (modal) modal.style.display = show ? 'flex' : 'none';
}

function renderPortfolio() {
    // Navbar
    document.getElementById('navBrand').innerText = portfolioData.hero.name;
    document.getElementById('navResumeBtn').href = portfolioData.hero.resumeUrl;

    // Set direct download button href in modal and hero section
    document.getElementById('resumeDownloadBtn').href = portfolioData.hero.resumeUrl;
    document.getElementById('heroResumeBtn').href = portfolioData.hero.resumeUrl;
    document.getElementById('heroResumeBtn').setAttribute('download', '');

    // Hero
    document.getElementById('heroName').innerText = portfolioData.hero.name;
    document.getElementById('heroSubtitle').innerText = portfolioData.hero.subtitle;
    document.getElementById('heroResumeBtn').href = portfolioData.hero.resumeUrl;

    // About
    document.getElementById('aboutPassion').innerText = portfolioData.about.passion;
    document.getElementById('aboutEducation').innerText = portfolioData.about.education;
    document.getElementById('aboutActivities').innerText = portfolioData.about.activities;

    // Timeline
    document.getElementById('timelineContainer').innerHTML = portfolioData.timeline.map(item => `
        <div class="mb-12 relative grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-8 group">
            <div class="absolute -left-[17px] top-1.5 bg-slate-950 border-2 border-cyan-400 w-3.5 h-3.5 rounded-full z-10 shadow-[0_0_8px_rgba(0,242,254,0.7)]"></div>
            <div class="md:col-span-3 text-left md:text-right font-mono text-sm font-semibold text-cyan-400 pt-0.5 tracking-tight">${item.date}</div>
            <div class="md:col-span-9 bg-slate-900/30 border border-slate-800/60 rounded-xl p-5 backdrop-blur-sm transition-colors group-hover:border-slate-700">
                <h3 class="text-lg font-bold font-display text-white">${item.position}</h3>
                <p class="text-xs font-medium text-purple-400 mt-0.5 uppercase tracking-wider">${item.organization}</p>
                <p class="text-sm text-slate-400 mt-3 leading-relaxed">${item.description}</p>
            </div>
        </div>
    `).join('');

    // Featured Project
    const featWrapper = document.getElementById('featuredProjectWrapper');
    featWrapper.innerHTML = portfolioData.projects.featured.map(feat => {
        const featSkillsHTML = feat.skills.map(sk => {
            let cat = 'analytics';
            if (portfolioData.skills.ai.includes(sk)) cat = 'ai';
            if (portfolioData.skills.engineering.includes(sk)) cat = 'engineering';
            return `<span class="px-2 py-0.5 text-[11px] font-mono rounded ${getSkillClass(cat)}">${sk}</span>`;
        }).join('');

        const githubBtn = feat.githubUrl 
            ? `<a href="${feat.githubUrl}" target="_blank" class="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors border border-slate-800 bg-slate-950 px-3 py-1.5 rounded">GitHub Codebase</a>` 
            : '';

        const liveBtn = feat.tableauUrl 
            ? `<a href="${feat.tableauUrl}" target="_blank" class="flex items-center gap-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-500/20 bg-cyan-950/20 px-3 py-1.5 rounded">Interactive Dashboard</a>` 
            : '';

        return `
            <div class="relative w-full min-h-[500px] flex flex-col items-center justify-center mb-4">
                <div class="w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-xl p-3 shadow-2xl opacity-80 md:absolute md:right-4 md:top-8 z-10">
                    <img src="${feat.snapshotImage}" alt="${feat.title}" class="w-full h-auto rounded border border-slate-900 object-cover min-h-[260px] bg-slate-900/60">
                </div>
                <div class="w-full max-w-2xl glassmorphism rounded-xl p-6 md:p-8 md:absolute md:left-4 md:bottom-16 z-20 text-left mt-6 md:mt-0">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Featured Deliverable</span>
                    <h3 class="font-display text-2xl font-bold text-white mt-1">${feat.title}</h3>
                    <p class="text-sm text-slate-300 mt-4 leading-relaxed bg-slate-950/40 p-4 border border-slate-800/40 rounded-lg">${feat.description}</p>
                    <div class="flex flex-wrap gap-1.5 mt-4">${featSkillsHTML}</div>
                    <div class="flex items-center gap-4 mt-6">${githubBtn}${liveBtn}</div>
                </div>
            </div>
        `;
    }).join('');

    // Noteworthy Projects
    document.getElementById('noteworthyGrid').innerHTML = portfolioData.projects.noteworthy.map(proj => {
        const projSkillsHTML = proj.skills.map(sk => {
            let cat = 'analytics';
            if (portfolioData.skills.ai.includes(sk)) cat = 'ai';
            if (portfolioData.skills.engineering.includes(sk)) cat = 'engineering';
            return `<span class="px-2 py-0.5 text-[11px] font-mono rounded ${getSkillClass(cat)}">${sk}</span>`;
        }).join('');

        return `
            <div class="glassmorphism rounded-xl p-6 text-left flex flex-col justify-between">
                <div>
                    <h4 class="font-display text-lg font-bold text-white tracking-tight">${proj.title}</h4>
                    <p class="text-xs text-slate-400 mt-3 leading-relaxed">${proj.description}</p>
                </div>
                <div class="mt-6">
                    <div class="flex flex-wrap gap-1.5">${projSkillsHTML}</div>
                    <a href="${proj.projectUrl}" target="_blank" class="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors mt-4">
                        <span>Access Source Engine</span>
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                    </a>
                </div>
            </div>
        `;
    }).join('');

    // Archive Table
    document.getElementById('archiveTableBody').innerHTML = portfolioData.projects.archive.map(row => `
        <tr class="border-b border-slate-800/60 hover:bg-slate-900/20 font-sans transition-colors">
            <td class="py-4 px-4 font-mono text-xs text-cyan-400/80">${row.year}</td>
            <td class="py-4 px-4 font-display font-semibold text-white">${row.title}</td>
            <td class="py-4 px-4 text-xs text-slate-400">${row.skills}</td>
            <td class="py-4 px-4 text-right">
                <a href="${row.url}" target="_blank" class="inline-block rounded border border-slate-800 bg-slate-950 px-3 py-1 text-xs font-mono text-slate-400 hover:text-white hover:border-slate-700">Link</a>
            </td>
        </tr>
    `).join('');

    // Skills
    document.getElementById('skillsAnalytics').innerHTML = createSkillBadges(portfolioData.skills.analytics, 'analytics');
    document.getElementById('skillsAI').innerHTML = createSkillBadges(portfolioData.skills.ai, 'ai');
    document.getElementById('skillsEngineering').innerHTML = createSkillBadges(portfolioData.skills.engineering, 'engineering');

    // Certificates Carousel
    const certListHTML = portfolioData.certificates.map(cert => `
        <a href="${cert.url}" target="_blank" class="glassmorphism w-64 rounded-xl p-4 mx-3 block text-left group transition-all duration-300">
            <div class="w-full h-32 bg-slate-950 rounded border border-slate-900 flex items-center justify-center p-2 mb-3 overflow-hidden">
                <img src="${cert.image}" alt="${cert.name} Blueprint Ledger" class="max-w-full max-h-full object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
            </div>
            <div class="font-display font-bold text-xs text-slate-300 group-hover:text-cyan-400 transition-colors tracking-tight line-clamp-2 h-8 flex items-center">${cert.name}</div>
        </a>
    `).join('');

    const boundarySpacerHTML = `
        <div class="w-40 flex flex-col items-center justify-center border border-dashed border-slate-800/80 bg-slate-950/20 rounded-xl mx-3 font-mono text-[10px] uppercase tracking-widest text-slate-500 select-none">
            <div>End / Start</div>
        </div>
    `;

    document.getElementById('certTicker').innerHTML = certListHTML + boundarySpacerHTML + certListHTML + boundarySpacerHTML;

    // Contact & Socials
    document.getElementById('linkGithub').href = portfolioData.interact.github;
    document.getElementById('linkLinkedin').href = portfolioData.interact.linkedin;
    document.getElementById('linkPhone').href = `tel:${portfolioData.interact.phone}`;
    
    document.getElementById('emailForm').onsubmit = (e) => {
        e.preventDefault();
        const bodyMsg = encodeURIComponent(e.target.querySelector('textarea').value);
        window.location.href = `mailto:${portfolioData.interact.email}?subject=Portfolio Inquiry&body=${bodyMsg}`;
    };
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('config.json')
        .then(res => res.json())
        .then(data => {
            portfolioData = data;
            renderPortfolio();
        })
        .catch(err => console.error("Error loading config.json:", err));
    
    initCanvasParticles();
});

function toggleResumeModal(show) {
    const modal = document.getElementById('resumeModal');
    const iframe = document.getElementById('resumeViewerFrame');
    
    if (show) {
        // Load the PDF source when opening
        iframe.src = portfolioData.hero.resumeUrl;
        modal.style.display = 'flex';
    } else {
        // Reset src on close to stop background resource loading
        iframe.src = '';
        modal.style.display = 'none';
    }
}