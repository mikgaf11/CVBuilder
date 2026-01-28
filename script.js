// ============================================
// STATE MANAGEMENT - Global Variables & Init
// ============================================
let experienceCount = 0;
let educationCount = 0;
let languageCount = 0;
let certificationCount = 0;
let currentTheme = '#208096';

document.addEventListener('DOMContentLoaded', () => {
    loadData();
    addExperience();
    addEducation();
    addLanguage();
    addCertification();
    updateCV();
});

// ============================================
// SECTION COLLAPSE/EXPAND
// ============================================
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const arrow = section.querySelector('.section-arrow');
    const content = section.querySelector('.section-content');
    
    section.classList.toggle('collapsed');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
    arrow.style.transform = section.classList.contains('collapsed') ? 'rotate(-90deg)' : 'rotate(0deg)';
}

// ============================================
// DARK MODE TOGGLE
// ============================================
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}

// ============================================
// THEME & STYLING - Color Theme Switching
// ============================================
function changeTheme(color) {
    currentTheme = color;
    document.documentElement.style.setProperty('--primary', color);
    
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    saveData();
    updateCV();
}

// ============================================
// PHOTO MANAGEMENT
// ============================================
function previewPhoto() {
    const file = document.getElementById('profilePhoto').files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = document.getElementById('photoPreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
            document.getElementById('removePhotoBtn').style.display = 'block';
            localStorage.setItem('profilePhoto', e.target.result);
            updateCV();
        };
        reader.readAsDataURL(file);
    }
}

function removePhoto() {
    document.getElementById('profilePhoto').value = '';
    document.getElementById('photoPreview').style.display = 'none';
    document.getElementById('removePhotoBtn').style.display = 'none';
    document.getElementById('cvPhoto').style.display = 'none';
    localStorage.removeItem('profilePhoto');
    updateCV();
}

// ============================================
// EXPERIENCE MANAGEMENT
// ============================================
function addExperience() {
    const id = experienceCount++;
    const container = document.getElementById('experienceContainer');
    const html = `
        <div class="array-item" id="exp-${id}">
            <div class="item-header">
                <strong>Job Title</strong>
                <button type="button" class="trash-btn" onclick="removeExperience(${id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Job Title" class="exp-title" data-id="${id}" onchange="updateCV(); saveData()">
                <input type="text" placeholder="Company" class="exp-company" data-id="${id}" onchange="updateCV(); saveData()">
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Start Date (e.g., Jan 2020)" class="exp-start" data-id="${id}" onchange="updateCV(); saveData()">
                <input type="text" placeholder="End Date (e.g., Present)" class="exp-end" data-id="${id}" onchange="updateCV(); saveData()">
            </div>
            <textarea placeholder="Job description and responsibilities..." class="exp-description" data-id="${id}" onchange="updateCV(); saveData()" style="margin-top: 8px;"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeExperience(id) {
    const el = document.getElementById(`exp-${id}`);
    if (el) {
        el.remove();
        updateCV();
        saveData();
    }
}

// ============================================
// EDUCATION MANAGEMENT
// ============================================
function addEducation() {
    const id = educationCount++;
    const container = document.getElementById('educationContainer');
    const html = `
        <div class="array-item" id="edu-${id}">
            <div class="item-header">
                <strong>Degree</strong>
                <button type="button" class="trash-btn" onclick="removeEducation(${id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Degree" class="edu-degree" data-id="${id}" onchange="updateCV(); saveData()">
                <input type="text" placeholder="School/University" class="edu-school" data-id="${id}" onchange="updateCV(); saveData()">
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Graduation Year" class="edu-year" data-id="${id}" onchange="updateCV(); saveData()">
                <input type="text" placeholder="Field of Study" class="edu-field" data-id="${id}" onchange="updateCV(); saveData()">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeEducation(id) {
    const el = document.getElementById(`edu-${id}`);
    if (el) {
        el.remove();
        updateCV();
        saveData();
    }
}

// ============================================
// LANGUAGES MANAGEMENT
// ============================================
function addLanguage() {
    const id = languageCount++;
    const container = document.getElementById('languagesContainer');
    const html = `
        <div class="language-card" id="lang-${id}">
            <div class="language-card-header">
                <input type="text" placeholder="Language Name (e.g., English)" class="lang-name" data-id="${id}" onchange="updateCV(); saveData()">
                <button type="button" class="trash-btn" onclick="removeLanguage(${id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <select class="lang-level" data-id="${id}" onchange="updateCV(); saveData()">
                <option value="">Select Proficiency Level</option>
                <option value="Native Speaker">Native Speaker</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
            </select>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeLanguage(id) {
    const el = document.getElementById(`lang-${id}`);
    if (el) {
        el.remove();
        updateCV();
        saveData();
    }
}

// ============================================
// CERTIFICATION MANAGEMENT
// ============================================
function addCertification() {
    const id = certificationCount++;
    const container = document.getElementById('certificationsContainer');
    const html = `
        <div class="array-item" id="cert-${id}">
            <div class="item-header">
                <strong>Certification</strong>
                <button type="button" class="trash-btn" onclick="removeCertification(${id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Certification/Award Name" class="cert-name" data-id="${id}" onchange="updateCV(); saveData()">
                <input type="text" placeholder="Issuing Organization" class="cert-issuer" data-id="${id}" onchange="updateCV(); saveData()">
            </div>
            <input type="text" placeholder="Date Obtained" class="cert-date" data-id="${id}" onchange="updateCV(); saveData()" style="margin-top: 8px;">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeCertification(id) {
    const el = document.getElementById(`cert-${id}`);
    if (el) {
        el.remove();
        updateCV();
        saveData();
    }
}

// ============================================
// CV PREVIEW UPDATE - Real-time CV Rendering
// ============================================
function updateCV() {
    const fullName = document.getElementById('fullName').value || 'Your Full Name';
    const title = document.getElementById('title').value;
    const dob = document.getElementById('dob').value;
    const nationality = document.getElementById('nationality').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const website = document.getElementById('website').value;
    const linkedin = document.getElementById('linkedin').value;
    const github = document.getElementById('github').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value;

    // Update CV Header
    document.getElementById('cvName').textContent = fullName;
    document.getElementById('cvTitle').textContent = title || 'Professional Title';

    // Update Meta Info (DOB & Nationality)
    let metaHTML = '';
    if (dob) {
        const birthDate = new Date(dob);
        const dobFormatted = birthDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
        metaHTML += `<span class="cv-meta-item"><i class="fas fa-birthday-cake"></i> ${dobFormatted}</span>`;
    }
    if (nationality) {
        metaHTML += `<span class="cv-meta-item"><i class="fas fa-globe"></i> ${nationality}</span>`;
    }
    document.getElementById('cvMeta').innerHTML = metaHTML;

    // Update Contact Info
    let contactHTML = '';
    if (email) contactHTML += `<div class="cv-contact-item"><i class="fas fa-envelope"></i> ${email}</div>`;
    if (phone) contactHTML += `<div class="cv-contact-item"><i class="fas fa-phone"></i> ${phone}</div>`;
    if (location) contactHTML += `<div class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> ${location}</div>`;
    if (website) contactHTML += `<div class="cv-contact-item"><i class="fas fa-globe"></i> ${website.replace(/^https?:\/\//, '')}</div>`;
    if (linkedin) contactHTML += `<div class="cv-contact-item"><i class="fab fa-linkedin"></i> ${linkedin}</div>`;
    if (github) contactHTML += `<div class="cv-contact-item"><i class="fab fa-github"></i> ${github}</div>`;
    document.getElementById('cvContact').innerHTML = contactHTML;

    // Update Photo
    const photoPreview = document.getElementById('photoPreview');
    if (photoPreview.style.display !== 'none' && photoPreview.src) {
        document.getElementById('cvPhoto').src = photoPreview.src;
        document.getElementById('cvPhoto').style.display = 'block';
    }

    // Update Summary
    if (summary) {
        document.getElementById('cvSummary').style.display = 'block';
        document.getElementById('cvSummaryText').textContent = summary;
    } else {
        document.getElementById('cvSummary').style.display = 'none';
    }

    // Update Experience
    let expHTML = '';
    document.querySelectorAll('.exp-title').forEach((input) => {
        const title = input.value;
        const company = document.querySelector(`.exp-company[data-id="${input.dataset.id}"]`)?.value;
        const start = document.querySelector(`.exp-start[data-id="${input.dataset.id}"]`)?.value;
        const end = document.querySelector(`.exp-end[data-id="${input.dataset.id}"]`)?.value;
        const description = document.querySelector(`.exp-description[data-id="${input.dataset.id}"]`)?.value;

        if (title || company || description) {
            expHTML += `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <span class="cv-entry-title">${title || 'Job Title'}</span>
                        <span class="cv-entry-date">${start}${end ? ' - ' + end : ''}</span>
                    </div>
                    ${company ? `<div class="cv-entry-subtitle">${company}</div>` : ''}
                    ${description ? `<div class="cv-entry-description">${description}</div>` : ''}
                </div>
            `;
        }
    });

    if (expHTML) {
        document.getElementById('cvExperienceSection').style.display = 'block';
        document.getElementById('cvExperienceList').innerHTML = expHTML;
    } else {
        document.getElementById('cvExperienceSection').style.display = 'none';
    }

    // Update Education
    let eduHTML = '';
    document.querySelectorAll('.edu-degree').forEach(input => {
        const degree = input.value;
        const school = document.querySelector(`.edu-school[data-id="${input.dataset.id}"]`)?.value;
        const year = document.querySelector(`.edu-year[data-id="${input.dataset.id}"]`)?.value;
        const field = document.querySelector(`.edu-field[data-id="${input.dataset.id}"]`)?.value;

        if (degree || school) {
            eduHTML += `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <span class="cv-entry-title">${degree || 'Degree'}</span>
                        <span class="cv-entry-date">${year || ''}</span>
                    </div>
                    ${school ? `<div class="cv-entry-subtitle">${school}</div>` : ''}
                    ${field ? `<div class="cv-entry-subtitle">${field}</div>` : ''}
                </div>
            `;
        }
    });

    if (eduHTML) {
        document.getElementById('cvEducationSection').style.display = 'block';
        document.getElementById('cvEducationList').innerHTML = eduHTML;
    } else {
        document.getElementById('cvEducationSection').style.display = 'none';
    }

    // Update Languages
    let langHTML = '';
    document.querySelectorAll('.lang-name').forEach(input => {
        const name = input.value;
        const level = document.querySelector(`.lang-level[data-id="${input.dataset.id}"]`)?.value;

        if (name) {
            langHTML += `
                <div class="cv-language-item">
                    <div class="cv-language-name">${name}</div>
                    ${level ? `<div class="cv-language-level">${level}</div>` : ''}
                </div>
            `;
        }
    });

    if (langHTML) {
        document.getElementById('cvLanguagesSection').style.display = 'block';
        document.getElementById('cvLanguagesList').innerHTML = langHTML;
    } else {
        document.getElementById('cvLanguagesSection').style.display = 'none';
    }

    // Update Skills
    if (skills.trim()) {
        const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);
        document.getElementById('cvSkillsSection').style.display = 'block';
        document.getElementById('cvSkillsList').innerHTML = skillsList
            .map(skill => `<div class="cv-skill">${skill}</div>`)
            .join('');
    } else {
        document.getElementById('cvSkillsSection').style.display = 'none';
    }

    // Update Certifications
    let certHTML = '';
    document.querySelectorAll('.cert-name').forEach(input => {
        const name = input.value;
        const issuer = document.querySelector(`.cert-issuer[data-id="${input.dataset.id}"]`)?.value;
        const date = document.querySelector(`.cert-date[data-id="${input.dataset.id}"]`)?.value;

        if (name || issuer) {
            certHTML += `
                <div class="cv-entry">
                    <div class="cv-entry-header">
                        <span class="cv-entry-title">${name || 'Certification'}</span>
                        <span class="cv-entry-date">${date || ''}</span>
                    </div>
                    ${issuer ? `<div class="cv-entry-subtitle">${issuer}</div>` : ''}
                </div>
            `;
        }
    });

    if (certHTML) {
        document.getElementById('cvCertificationsSection').style.display = 'block';
        document.getElementById('cvCertificationsList').innerHTML = certHTML;
    } else {
        document.getElementById('cvCertificationsSection').style.display = 'none';
    }
}

// ============================================
// DATA PERSISTENCE
// ============================================
function saveData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        title: document.getElementById('title').value,
        dob: document.getElementById('dob').value,
        nationality: document.getElementById('nationality').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        theme: currentTheme,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cvData', JSON.stringify(data));
}

function loadData() {
    const saved = localStorage.getItem('cvData');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('fullName').value = data.fullName || '';
        document.getElementById('title').value = data.title || '';
        document.getElementById('dob').value = data.dob || '';
        document.getElementById('nationality').value = data.nationality || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('phone').value = data.phone || '';
        document.getElementById('location').value = data.location || '';
        document.getElementById('website').value = data.website || '';
        document.getElementById('linkedin').value = data.linkedin || '';
        document.getElementById('github').value = data.github || '';
        document.getElementById('summary').value = data.summary || '';
        document.getElementById('skills').value = data.skills || '';
        
        if (data.theme) {
            currentTheme = data.theme;
            document.documentElement.style.setProperty('--primary', data.theme);
        }
    }
    
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
        document.getElementById('photoPreview').src = savedPhoto;
        document.getElementById('photoPreview').style.display = 'block';
        document.getElementById('removePhotoBtn').style.display = 'block';
    }
}

// ============================================
// EXPORT & IMPORT
// ============================================
function exportData() {
    const data = {
        fullName: document.getElementById('fullName').value,
        title: document.getElementById('title').value,
        dob: document.getElementById('dob').value,
        nationality: document.getElementById('nationality').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        website: document.getElementById('website').value,
        linkedin: document.getElementById('linkedin').value,
        github: document.getElementById('github').value,
        summary: document.getElementById('summary').value,
        skills: document.getElementById('skills').value,
        theme: currentTheme,
        photo: document.getElementById('photoPreview').src,
        exportDate: new Date().toLocaleString()
    };
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${document.getElementById('fullName').value || 'backup'}_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
}

function importData() {
    document.getElementById('importFile').click();
}

function handleImport(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                document.getElementById('fullName').value = data.fullName || '';
                document.getElementById('title').value = data.title || '';
                document.getElementById('dob').value = data.dob || '';
                document.getElementById('nationality').value = data.nationality || '';
                document.getElementById('email').value = data.email || '';
                document.getElementById('phone').value = data.phone || '';
                document.getElementById('location').value = data.location || '';
                document.getElementById('website').value = data.website || '';
                document.getElementById('linkedin').value = data.linkedin || '';
                document.getElementById('github').value = data.github || '';
                document.getElementById('summary').value = data.summary || '';
                document.getElementById('skills').value = data.skills || '';
                
                if (data.theme) {
                    currentTheme = data.theme;
                    document.documentElement.style.setProperty('--primary', data.theme);
                }
                
                if (data.photo) {
                    document.getElementById('photoPreview').src = data.photo;
                    document.getElementById('photoPreview').style.display = 'block';
                    document.getElementById('removePhotoBtn').style.display = 'block';
                }
                
                saveData();
                updateCV();
                alert('✅ CV data imported successfully!');
            } catch (error) {
                alert('❌ Error importing file. Please check the file format.');
            }
        };
        reader.readAsText(file);
    }
    document.getElementById('importFile').value = '';
}

// ============================================
// EXPORT & UTILITY - PDF Download & Form Reset
// ============================================
function downloadPDF() {
    const element = document.getElementById('cvContent');
    const opt = {
        margin: 10,
        filename: 'CV_' + (document.getElementById('fullName').value || 'Resume') + '.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}

function resetForm() {
    if (confirm('⚠️ This will clear all data. Are you sure?')) {
        document.getElementById('fullName').value = '';
        document.getElementById('title').value = '';
        document.getElementById('dob').value = '';
        document.getElementById('nationality').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('location').value = '';
        document.getElementById('website').value = '';
        document.getElementById('linkedin').value = '';
        document.getElementById('github').value = '';
        document.getElementById('summary').value = '';
        document.getElementById('skills').value = '';
        document.getElementById('profilePhoto').value = '';
        document.getElementById('photoPreview').style.display = 'none';
        document.getElementById('removePhotoBtn').style.display = 'none';
        
        document.getElementById('experienceContainer').innerHTML = '';
        document.getElementById('educationContainer').innerHTML = '';
        document.getElementById('languagesContainer').innerHTML = '';
        document.getElementById('certificationsContainer').innerHTML = '';
        
        experienceCount = 0;
        educationCount = 0;
        languageCount = 0;
        certificationCount = 0;
        
        localStorage.removeItem('cvData');
        localStorage.removeItem('profilePhoto');
        
        addExperience();
        addEducation();
        addLanguage();
        addCertification();
        updateCV();
    }
}
