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

    // Normalize to array whether it is a single object or an array in config.json
    const featuredList = Array.isArray(portfolioData.projects.featured)
        ? portfolioData.projects.featured
        : [portfolioData.projects.featured];

    featWrapper.innerHTML = featuredList.map(feat => {
        // Map skill badge tags
        const featSkillsHTML = feat.skills.map(sk => {
            let cat = 'analytics';
            if (portfolioData.skills.ai.includes(sk)) cat = 'ai';
            if (portfolioData.skills.engineering.includes(sk)) cat = 'engineering';
            return `<span class="px-2 py-0.5 text-[11px] font-mono rounded ${getSkillClass(cat)}">${sk}</span>`;
        }).join('');

        // Map description bullets
        const featDescHTML = Array.isArray(feat.description)
            ? `<ul class="space-y-2 text-sm text-slate-300">${feat.description.map(item => `<li class="flex items-start gap-2"><span class="text-cyan-400 mt-1 text-xs">▹</span><span>${item}</span></li>`).join('')}</ul>`
            : `<p class="text-sm text-slate-300 leading-relaxed">${feat.description}</p>`;

        // Optional GitHub icon button with tooltip
        const githubBtn = feat.githubUrl 
            ? `<a href="${feat.githubUrl}" target="_blank" class="group/btn relative flex h-8 w-8 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/90 text-slate-300 transition-all hover:border-slate-600 hover:text-white hover:scale-105" aria-label="View the code">
                <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.061.069-.061 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>
                <span class="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded bg-slate-950 px-2 py-1 font-sans text-[11px] font-medium text-slate-200 opacity-0 shadow-lg transition-opacity group-hover/btn:opacity-100 border border-slate-800 z-30">View the code</span>
            </a>` 
            : '';

        // Optional Dashboard icon button with tooltip
        const liveBtn = feat.tableauUrl 
            ? `<a href="${feat.tableauUrl}" target="_blank" class="group/btn relative flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 transition-all hover:bg-cyan-500 hover:text-slate-950 hover:scale-105 hover:shadow-[0_0_12px_rgba(0,242,254,0.4)]" aria-label="Interact with the dashboard">
                <svg class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>
                <span class="pointer-events-none absolute -bottom-8 right-0 whitespace-nowrap rounded bg-slate-950 px-2 py-1 font-sans text-[11px] font-medium text-slate-200 opacity-0 shadow-lg transition-opacity group-hover/btn:opacity-100 border border-slate-800 z-30">Interact with the dashboard</span>
            </a>` 
            : '';

        // Top action bar container (only rendered if at least one link exists)
        const actionHeaderHTML = (githubBtn || liveBtn)
            ? `<div class="flex items-center justify-end gap-2 pb-2 mb-2 border-b border-slate-800/60">${githubBtn}${liveBtn}</div>`
            : '';

        return `
            <div class="relative w-full min-h-[520px] flex flex-col justify-center items-start my-12">
                <!-- Media Container (Pushed right, 68% width, glow hover effect without scale) -->
                <div class="glassmorphism w-full md:w-[68%] md:absolute md:right-0 md:top-4 z-10 rounded-xl p-3 shadow-2xl transition-all duration-400">
                    ${actionHeaderHTML}
                    <img src="${feat.snapshotImage}" alt="${feat.title}" class="w-full aspect-video object-cover object-top rounded border border-slate-900 bg-slate-900/60" loading="lazy">
                </div>

                <!-- Details Container (Pushed left, 48% width with overlap) -->
                <div class="w-full md:w-[48%] glassmorphism rounded-xl p-6 md:p-8 md:absolute md:left-0 md:top-12 z-20 text-left mt-6 md:mt-0 shadow-2xl">
                    <span class="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold">Featured Deliverable</span>
                    <h3 class="font-display text-2xl font-bold text-white mt-1 mb-4">${feat.title}</h3>
                    <div class="bg-slate-950/60 p-4 border border-slate-800/60 rounded-lg">
                        ${featDescHTML}
                    </div>
                    <div class="flex flex-wrap gap-1.5 mt-5">${featSkillsHTML}</div>
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

        const noteworthyDescHTML = Array.isArray(proj.description)
            ? `<ul class="space-y-1.5 text-xs text-slate-400 mt-3">${proj.description.map(item => `<li class="flex items-start gap-2"><span class="text-cyan-400 text-[10px] mt-0.5">▹</span><span>${item}</span></li>`).join('')}</ul>`
            : `<p class="text-xs text-slate-400 mt-3 leading-relaxed">${proj.description}</p>`;
        
        return `
            <div class="glassmorphism rounded-xl p-6 text-left flex flex-col justify-between">
                <div>
                    <h4 class="font-display text-lg font-bold text-white tracking-tight">${proj.title}</h4>
                    ${noteworthyDescHTML}
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