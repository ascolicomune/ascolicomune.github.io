volumeSelect = document.getElementById('volume-select');
bookSelect = document.getElementById('book-select');
rubricSelect = document.getElementById('rubric-select');
contentElement = document.getElementById('content');


fetch('assets/statuti_web.json')
    .then(response => response.json())
    .then(data => {
        // Function to generate navigation based on volumes
        function generateNavigation() {
            volumes = Object.keys(data);
            volumeSelect.addEventListener('change', handleVolumeChange);
            for (v_i in volumes) {
                option = document.createElement('option');
                option.value = v_i;
                option.textContent = volumes[v_i];
                volumeSelect.appendChild(option);
            }
        }

        // Function to populate books and content
        function populateBooksAndContent(selectedVolume) {
            volume_selected_key = Object.keys(data)[selectedVolume]
            volume_selected = data[volume_selected_key];
            if (typeof volume_selected === "string") {
                updateURLParams(selectedVolume, null, null); // Update URL params
                contentElement.innerHTML = volume_selected;
            } else {
                books = Object.keys(volume_selected);
                for (b_i in books) {
                    option = document.createElement('option');
                    option.value = b_i;
                    option.textContent = books[b_i];
                    bookSelect.appendChild(option);
                }
            }
            // Trigger book change event if books are available
            if (bookSelect.options.length > 0) {
                bookSelect.selectedIndex = 0; // Select the first book by default
                selectedBook = bookSelect.value;
                updateURLParams(selectedVolume, selectedBook, null); // Update URL params
                populateRubricsAndContent(selectedVolume, selectedBook);
            }
        }

        // Function to populate rubrics and content
        function populateRubricsAndContent(selectedVolume, selectedBook) {
            volume_selected_key = Object.keys(data)[selectedVolume]
            book_selected_key = Object.keys(data[volume_selected_key])[selectedBook]
            book_selected = data[volume_selected_key][book_selected_key];
            if (typeof book_selected === "string") {
                updateURLParams(selectedVolume, selectedBook, null); // Update URL params
                contentElement.innerHTML = book_selected;
            } else {
                rubrics = Object.keys(book_selected);
                for (r_i in rubrics) {
                    option = document.createElement('option');
                    option.value = r_i;
                    option.textContent = rubrics[r_i];
                    rubricSelect.appendChild(option);
                }
            }
            if (rubricSelect.options.length > 0) {
                rubricSelect.selectedIndex = 0; // Select the first rubric by default
                selectedRubric = rubricSelect.value;
                updateURLParams(selectedVolume, selectedBook, selectedRubric); // Update URL params
                rubric_key = Object.keys(data[volume_selected_key][book_selected_key])[selectedRubric];
                rubricText = data[volume_selected_key][book_selected_key][rubric_key]
                contentElement.innerHTML = rubricText;
                document.querySelectorAll(".linkRubrica").forEach(function(element) {
                    element.innerHTML = '<svg class="index_link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>'
                });
            }
        }

        // Function to programmatically select volume, book, and rubric
        function selectDocument(volume, book, rubric) {
            volumeSelect.value = volume;
            handleVolumeChange({ target: volumeSelect });
            if (book && rubric) {
                bookSelect.value = book;
                handleBookChange({ target: bookSelect });
                rubricSelect.value = rubric;
                handleRubricChange({ target: rubricSelect });
            } else if (book) {
                bookSelect.value = book;
                handleBookChange({ target: bookSelect });
            }
        }

        // Function to handle volume change event
        function handleVolumeChange(event) {
            selectedVolume = event.target.value;
            updateURLParams(selectedVolume, null, null); // Update URL params
            contentElement.innerHTML = ''; // Clear previous content
            bookSelect.innerHTML = '';
            rubricSelect.innerHTML = '';
            populateBooksAndContent(selectedVolume);
        }

        // Function to handle book change event
        function handleBookChange(event) {
            selectedVolume = volumeSelect.value;
            selectedBook = event.target.value;
            updateURLParams(selectedVolume, selectedBook, null); // Update URL params
            contentElement.innerHTML = ''; // Clear previous content
            rubricSelect.innerHTML = '';
            populateRubricsAndContent(selectedVolume, selectedBook);
        }

        // Function to handle rubric change event
        function handleRubricChange(event) {
            selectedVolume = volumeSelect.value;
            selectedBook = bookSelect.value;
            selectedRubric = event.target.value;
            updateURLParams(selectedVolume, selectedBook, selectedRubric); // Update URL params
            volume_selected_key = Object.keys(data)[selectedVolume]
            book_selected_key = Object.keys(data[volume_selected_key])[selectedBook]
            rubric_key = Object.keys(data[volume_selected_key][book_selected_key])[selectedRubric];
            rubricText = data[volume_selected_key][book_selected_key][rubric_key]
            contentElement.innerHTML = rubricText;
            document.querySelectorAll(".linkRubrica").forEach(function(element) {
                element.innerHTML = '<svg class="index_link" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"/></svg>'
            });
        }

        // Function to update URL parameters
        function updateURLParams(volume, book, rubric) {
            console.log(volume, book, rubric)
            params = new URLSearchParams(window.location.search);
            params.delete('id'); // Clear existing volume param
            id_p = ""
            if (volume){
                id_p += volume
                if (book){
                    id_p += '_'+book
                }
                 if (rubric){
                     id_p += '_'+rubric
                 }
            }
            params.set('id', id_p);
            window.history.replaceState({}, '', `${location.pathname}?${params}`);
        }

        // Function to get URL parameters
        function getURLParams() {
            let volume = null;
            let book = null;
            let rubric = null;

            params = new URLSearchParams(window.location.search);
            id_p = params.get('id');
            if (id_p){
                pathSegments = id_p.split('_')
                if (pathSegments.length >= 1) {
                    volume = pathSegments[0];
                }
                if (pathSegments.length >= 2) {
                    book = pathSegments[1];
                }
                if (pathSegments.length >= 3) {
                    rubric = pathSegments[2];
                }
            }

            return { volume, book, rubric };
        }

        // Attach event listeners for book and rubric changes
        bookSelect.addEventListener('change', handleBookChange);
        rubricSelect.addEventListener('change', handleRubricChange);

        // Generate initial navigation
        generateNavigation();

        // Check URL parameters and update selections accordingly
        var { volume, book, rubric } = getURLParams();
        if (volume) {
            try{
                selectDocument(volume, book, rubric);
            }
            catch{
                selectDocument(0);
            }
        } else{
                selectDocument(0);
        }
    });
