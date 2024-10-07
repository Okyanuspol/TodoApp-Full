import express from "express";

const app = express();

//middleware
app.use(express.json()); // zum Parsen von JSON-Anfragen

// Beispieldaten
const books = [
    { id: 1, title: "Der große Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "1984", author: "George Orwell" }
];

// Alle Bücher abrufen
app.get('/api/books', (req, res) => {
    res.json(books);
});

// Ein einzelnes Buch anhand der ID abrufen
app.get('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        // TODO: Statuscode für "Buch nicht gefunden" hinzufügen
        return res.status(404).send("Buch nicht gefunden");
    } else {
        return res.json(book);
    }
    
});

// Ein neues Buch hinzufügen
app.post('/api/books', (req, res) => {
    if (!req.body.title || !req.body.author) {
        // TODO: Statuscode für ungültige Anfrage (fehlende Daten) hinzufügen
        res.status(400).send("Titel und Autor sind erforderlich.");
    }
    
    const newBook = {
        id: books.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    books.push(newBook);
    
    res.status(201).send(newBook);
    // TODO: Statuscode für erfolgreiches Erstellen einer neuen Ressource hinzufügen
});

// Titel und Autor eines Buches aktualisieren
app.put('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        // TODO: Statuscode für "Buch nicht gefunden" hinzufügen
        return res.status(404).send("Buch nicht gefunden");
    }
    
    if (!req.body.title || !req.body.author) {
        // TODO: Statuscode für ungültige Anfrage (fehlende Daten) hinzufügen
        return res.status(400).send("Titel und Autor sind erforderlich.");
    }
    
    book.title = req.body.title;
    book.author = req.body.author;
    
    res.json(book);
});

// Ein Buch anhand der ID löschen
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        // TODO: Statuscode für "Buch nicht gefunden" hinzufügen
        return res.status(404).send("Buch nicht gefunden");
    }

    const index = books.indexOf(book);
    books.splice(index, 1);

    res.json(book);
});

// Server starten
app.listen(3000, () => {
    console.log('Server läuft auf Port 3000');
});