/* ==========================================
   WORK — ELENCO PROGETTI E GALLERIE
   Caricato solo da work.html
   ========================================== */

(function () {
    const body = document.body;
    const list = document.getElementById("projectList");
    const viewer = document.getElementById("viewer");
    const grid = document.getElementById("imageGrid");
    const backButton = document.getElementById("backButton");

    if (!list || !viewer || !grid || !backButton) return;

    // Progetti con galleria numerata: cartella e intervallo di file.
    const galleries = {
        "fluid-body":  { folder: "imggg",  start: 1,  end: 38 },
        "capucci":     { folder: "imggg",  start: 39, end: 62 },
        "souls":       { folder: "imggg",  start: 63, end: 86 },
        "seven-gauge": { folder: "imgggg", start: 87, end: 116 }
    };

    function galleryPaths(key) {
        const range = galleries[key];
        if (!range) return [];

        const paths = [];
        for (let i = range.start; i <= range.end; i++) {
            paths.push(`${range.folder}/${i}.jpg`);
        }
        return paths;
    }

    function pathsFor(element) {
        if (element.dataset.gallery) return galleryPaths(element.dataset.gallery);

        return (element.dataset.image || "")
            .split(",")
            .map(path => path.trim())
            .filter(Boolean);
    }

    function findById(id) {
        return Array.from(list.querySelectorAll("[data-id]"))
            .find(element => element.dataset.id === id) || null;
    }

    function currentId() {
        return decodeURIComponent(location.hash.slice(1));
    }

    /* Mostra la galleria dell'elemento (o torna all'elenco se null). */
    function render(element) {
        list.querySelectorAll(".is-active").forEach(active => {
            active.classList.remove("is-active");
            active.removeAttribute("aria-current");
        });

        grid.replaceChildren();

        if (!element) {
            body.classList.remove("project-view");
            return;
        }

        element.classList.add("is-active");
        element.setAttribute("aria-current", "true");

        const title = element.dataset.title || "Project";

        pathsFor(element).forEach((path, index) => {
            const image = document.createElement("img");
            image.src = path;
            image.alt = `${title} — image ${index + 1}`;
            image.loading = "lazy";
            image.decoding = "async";
            grid.appendChild(image);
        });

        body.classList.add("project-view");
        viewer.scrollTop = 0;
    }

    function open(element) {
        history.pushState(null, "", `#${encodeURIComponent(element.dataset.id)}`);
        render(element);
    }

    function close() {
        history.pushState(null, "", location.pathname + location.search);
        render(null);
    }

    list.addEventListener("click", function (event) {
        const element = event.target.closest(".work-row, .work-link");
        if (element && list.contains(element)) open(element);
    });

    backButton.addEventListener("click", close);

    // Tasto Indietro / Avanti del browser e link diretti (work.html#TR01).
    window.addEventListener("popstate", function () {
        render(findById(currentId()));
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && body.classList.contains("project-view")) {
            close();
        }
    });

    render(findById(currentId()));
})();
