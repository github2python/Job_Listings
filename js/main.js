document.addEventListener("DOMContentLoaded", () => {
  const jobListings = document.getElementById("job-listings");
  const workTypeFilter = document.getElementById("work-type");
  const searchTitleInput = document.getElementById("search-title");
  const sortDateSelect = document.getElementById("sort-date");
  const pagination = document.getElementById("pagination");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const pageIndicator = document.getElementById("page-indicator");

  let currentPage = 1;
  const itemsPerPage = 10;
  let originalJobs = []; // Store the original job listings
  let filteredJobs = []; // Store the filtered job listings
  let totalPages = 1;

  fetch("joblistings.csv")
    .then((response) => response.text())
    .then((data) => {
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: function (results) {
          originalJobs = results.data; // Assign original jobs
          console.log(results.data);
          filteredJobs = originalJobs; // Initially, filtered jobs are the same as original
          totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
          displayPaginatedJobs(currentPage);
          updatePaginationControls();

          workTypeFilter.addEventListener("change", filterAndDisplayJobs);
          searchTitleInput.addEventListener("input", filterAndDisplayJobs);
          sortDateSelect.addEventListener("change", filterAndDisplayJobs);
          prevBtn.addEventListener("click", () => changePage(-1));
          nextBtn.addEventListener("click", () => changePage(1));
        },
      });
    });

  function displayPaginatedJobs(page) {
    jobListings.innerHTML = "";
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedJobs = filteredJobs.slice(start, end); // Use filteredJobs for pagination
    displayJobs(paginatedJobs);
  }

  function displayJobs(jobs) {
    jobs.forEach((job) => {
      const jobCard = document.createElement("div");
      jobCard.classList.add("job-card");
      jobCard.innerHTML = `
                  <h2>${job["Company"]}</h2>
                  <h3>${job["Job Title"]}</h3>
                  <p>Location: ${job["Location"]}</p>
                  <p>Work Type: ${job["Work Type"]}</p>
                  <p>Posting Date: ${job["Posting Date"]}</p>
                  <p>${job["Job Description"]}</p>
                  <a href="${
                    job[" Apply_Link"] || "#"
                  }" target="_blank" class="apply-button">Apply</a>
              `;
      jobListings.appendChild(jobCard);
    });
  }

  function filterAndDisplayJobs() {
    const selectedType = workTypeFilter.value;
    const searchTitle = searchTitleInput.value.toLowerCase();
    const sortOrder = sortDateSelect.value;

    // Filter jobs based on job type and title
    filteredJobs = originalJobs.filter((job) => {
      const matchesType =
        selectedType === "All" || job["Work Type"] === selectedType;
      const matchesTitle = job["Job Title"].toLowerCase().includes(searchTitle);
      return matchesType && matchesTitle;
    });

    // Sort jobs based on the selected sort order
    filteredJobs.sort((a, b) => {
      const dateA = new Date(a["Posting Date"]);
      const dateB = new Date(b["Posting Date"]);
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    // Update pagination
    totalPages = Math.ceil(filteredJobs.length / itemsPerPage);
    currentPage = 1; // Reset to the first page
    displayPaginatedJobs(currentPage);
    updatePaginationControls();
  }

  function changePage(direction) {
    currentPage += direction;
    displayPaginatedJobs(currentPage);
    updatePaginationControls();
  }

  function updatePaginationControls() {
    pageIndicator.textContent = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
  }
});
