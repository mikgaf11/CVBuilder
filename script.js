// ============================================
// STATE MANAGEMENT - Global Variables & Init
// ============================================
let experienceCount = 0;
let educationCount = 0;
let languageCount = 0;
let certificationCount = 0;
let currentTheme = '#208096';

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    addExperience();
    addEducation();
    addLanguage();
    addCertification();
    updateCV();
});

// ============================================
// THEME & STYLING - Color Theme Switching
// ============================================
function changeTheme(color) {
    currentTheme = color;
    document.documentElement.style.setProperty('--primary', color);
    
    // Update active button
    document.querySelectorAll('.color-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    updateCV();
}

// ============================================
// PHOTO MANAGEMENT - Image Upload & Preview
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
    updateCV();
}

// ============================================
// EXPERIENCE SECTION - Add/Remove Work
// ============================================
function addExperience() {
    const id = experienceCount++;
    const container = document.getElementById('experienceContainer');
    const html = `
        <div class="array-item" id="exp-${id}">
            <div class="item-header">
                <strong>Job Title</strong>
                <button class="remove-btn" onclick="removeExperience(${id})">Remove</button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Job Title" class="exp-title" data-id="${id}" onchange="updateCV()">
                <input type="text" placeholder="Company" class="exp-company" data-id="${id}" onchange="updateCV()">
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Start Date (e.g., Jan 2020)" class="exp-start" data-id="${id}" onchange="updateCV()">
                <input type="text" placeholder="End Date (e.g., Present)" class="exp-end" data-id="${id}" onchange="updateCV()">
            </div>
            <textarea placeholder="Job description and responsibilities..." class="exp-description" data-id="${id}" onchange="updateCV()" style="margin-top: 8px;"></textarea>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeExperience(id) {
    document.getElementById(`exp-${id}`).remove();
    updateCV();
}

// ============================================
// EDUCATION SECTION - Add/Remove Education
// ============================================
function addEducation() {
    const id = educationCount++;
    const container = document.getElementById('educationContainer');
    const html = `
        <div class="array-item" id="edu-${id}">
            <div class="item-header">
                <strong>Degree</strong>
                <button class="remove-btn" onclick="removeEducation(${id})">Remove</button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Degree" class="edu-degree" data-id="${id}" onchange="updateCV()">
                <input type="text" placeholder="School/University" class="edu-school" data-id="${id}" onchange="updateCV()">
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Graduation Year" class="edu-year" data-id="${id}" onchange="updateCV()">
                <input type="text" placeholder="Field of Study" class="edu-field" data-id="${id}" onchange="updateCV()">
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeEducation(id) {
    document.getElementById(`edu-${id}`).remove();
    updateCV();
}

// ============================================
// LANGUAGES MANAGEMENT - Add/Remove Languages
// ============================================
function addLanguage() {
    const id = languageCount++;
    const container = document.getElementById('languagesContainer');
    const html = `
        <div class="language-card" id="lang-${id}">
            <input type="text" placeholder="Language Name (e.g., English)" class="lang-name" data-id="${id}" onchange="updateCV()">
            <select class="lang-level" data-id="${id}" onchange="updateCV()">
                <option value="">Select Proficiency Level</option>
                <option value="Native Speaker">Native Speaker</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
            </select>
            <button class="remove-btn" onclick="removeLanguage(${id})">Remove</button>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeLanguage(id) {
    document.getElementById(`lang-${id}`).remove();
    updateCV();
}

// ============================================
// CERTIFICATION MANAGEMENT - Add/Remove Certs
// ============================================
function addCertification() {
    const id = certificationCount++;
    const container = document.getElementById('certificationsContainer');
    const html = `
        <div class="array-item" id="cert-${id}">
            <div class="item-header">
                <strong>Certification</strong>
                <button class="remove-btn" onclick="removeCertification(${id})">Remove</button>
            </div>
            <div class="two-columns">
                <input type="text" placeholder="Certification/Award Name" class="cert-name" data-id="${id}" onchange="updateCV()">
                <input type="text" placeholder="Issuing Organization" class="cert-issuer" data-id="${id}" onchange="updateCV()">
            </div>
            <input type="text" placeholder="Date Obtained" class="cert-date" data-id="${id}" onchange="updateCV()" style="margin-top: 8px;">
        </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
}

function removeCertification(id) {
    document.getElementById(`cert-${id}`).remove();
    updateCV();
}

// ============================================
// CV PREVIEW UPDATE - Real-time CV Rendering
// ============================================
function updateCV() {
    // ===== PERSONAL INFO =====
    const fullName = document.getElementById('fullName').value || 'Your Full Name';
    const title = document.getElementById('title').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const location = document.getElementById('location').value;
    const website = document.getElementById('website').value;
    const summary = document.getElementById('summary').value;
    const skills = document.getElementById('skills').value;

    // Update CV Header
    document.getElementById('cvName').textContent = fullName;
    document.getElementById('cvTitle').textContent = title || 'Professional Title';

    // Update Contact Info
    let contactHTML = '';
    if (email) contactHTML += `<div class="cv-contact-item"><i class="fas fa-envelope"></i> <span style="color: #000;">${email}</span></div>`;
    if (phone) contactHTML += `<div class="cv-contact-item"><i class="fas fa-phone"></i> <span style="color: #000;">${phone}</span></div>`;
    if (location) contactHTML += `<div class="cv-contact-item"><i class="fas fa-map-marker-alt"></i> <span style="color: #000;">${location}</span></div>`;
    if (website) contactHTML += `<div class="cv-contact-item"><i class="fas fa-globe"></i> <a href="${website}" target="_blank" style="color: #000;">${website.replace(/^https?:\/\//, '')}</a></div>`;
    document.getElementById('cvContact').innerHTML = contactHTML;

    // Update Photo
    const photoPreview = document.getElementById('photoPreview');
    if (photoPreview.style.display !== 'none' && photoPreview.src) {
        document.getElementById('cvPhoto').src = photoPreview.src;
        document.getElementById('cvPhoto').style.display = 'block';
    }

    // ===== SUMMARY SECTION =====
    if (summary) {
        document.getElementById('cvSummary').style.display = 'block';
        document.getElementById('cvSummaryText').textContent = summary;
    } else {
        document.getElementById('cvSummary').style.display = 'none';
    }

    // ===== EXPERIENCE SECTION =====
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

    // ===== EDUCATION SECTION =====
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

    // ===== LANGUAGES SECTION =====
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

    // ===== SKILLS SECTION =====
    if (skills.trim()) {
        const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);
        document.getElementById('cvSkillsSection').style.display = 'block';
        document.getElementById('cvSkillsList').innerHTML = skillsList
            .map(skill => `<div class="cv-skill">${skill}</div>`)
            .join('');
    } else {
        document.getElementById('cvSkillsSection').style.display = 'none';
    }

    // ===== CERTIFICATIONS SECTION =====
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
    if (confirm('Are you sure you want to reset the entire form?')) {
        document.getElementById('fullName').value = '';
        document.getElementById('title').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('location').value = '';
        document.getElementById('website').value = '';
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
        
        addExperience();
        addEducation();
        addLanguage();
        addCertification();
        updateCV();
    }
}
