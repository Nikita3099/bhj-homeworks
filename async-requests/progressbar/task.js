document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    const progress = document.getElementById('progress');

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file');
        const file = fileInput.files[0];

        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = event.loaded / event.total;
                progress.value = percentComplete;
            }
        });

        xhr.addEventListener('load', () => {
            if (xhr.status === 201) {
                alert('File uploaded successfully!');
                progress.value = 1;
            } else {
                alert(`Upload failed with status ${xhr.status}`);
            }
        });

        xhr.addEventListener('error', () => {
            alert('An error occurred during the upload.');
        });

        xhr.open('POST', 'https://students.netoservices.ru/nestjs-backend/upload', true);
        xhr.send(formData);
    });
});