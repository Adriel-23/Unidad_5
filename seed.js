import mongoose from "mongoose";
import connectMongoDB from "./src/config/mongoDB.config.js";
import Product from "./src/models/product.model.js";

const allProducts = [
    {
        _id: "prod-1",
        title: "Martin D-28 Acoustic",
        category: "Guitarra Acústica",
        price: 3199.00,
        image: "https://i.pinimg.com/1200x/93/25/f7/9325f7711cd35735b4870334c43a4af6.jpg",
        description: "Madera de palisandro de las Indias Orientales.",
        tags: ["guitarra", "guitarras", "acustica", "acústica", "de cuerda", "clasica", "clásica", "madera"]
    },
    {
        _id: "prod-2",
        title: "Nord Stage 3 88",
        category: "Pianos y Teclados",
        price: 4499.00,
        image: "https://i.pinimg.com/1200x/99/fa/f6/99faf666c7f050a67e28e6f550510be4.jpg",
        description: "El estándar de la industria para presentaciones en vivo.",
        tags: ["piano", "pianos", "teclado", "teclados", "sintetizador", "organo", "de tecla"]
    },
    {
        _id: "prod-3",
        title: "Audio-Technica ATH-M50x",
        category: "Accesorios",
        price: 149.00,
        image: "https://i.pinimg.com/736x/17/4d/e9/174de92ffcc95c66fbed3a25c893912a.jpg",
        description: "Monitores de estudio profesionales.",
        tags: ["auricular", "auriculares", "audifonos", "audifono", "monitores", "audio", "estudio", "musica"]
    },
    {
        _id: "prod-4",
        title: "Ludwig Supraphonic Snare",
        category: "Percusión",
        price: 599.00,
        image: "https://i.pinimg.com/1200x/aa/5e/b8/aa5eb87c97a0a4008170966a796e42e2.jpg",
        description: "El redoblante más grabado de la historia.",
        tags: ["bateria", "baterias", "percusion", "tambor", "redoblante", "caja", "platillos"]
    },
    {
        _id: "prod-5",
        title: "American Vintage II 1961 Stratocaster",
        category: "Guitarra Eléctrica",
        price: 2249.99,
        image: "https://i.pinimg.com/1200x/28/d4/f6/28d4f69e41c915373c0542023bdff641.jpg",
        description: "",
        tags: ["guitarra", "guitarras", "electrica", "eléctrica", "fender", "stratocaster", "de cuerda"]
    },
    {
        _id: "prod-6",
        title: "Les Paul Standard '50s Figured Top",
        category: "Guitarra Eléctrica",
        price: 2999.00,
        image: "https://i.pinimg.com/736x/50/f9/0a/50f90ae037cb7c2d47840be2d9eed061.jpg",
        description: "",
        tags: ["guitarra", "guitarras", "electrica", "eléctrica", "gibson", "les paul", "de cuerda"]
    },
    {
        _id: "prod-7",
        title: "G6120T Players Edition Nashville",
        category: "Guitarra Eléctrica",
        price: 2599.99,
        image: "https://sc1.musik-produktiv.com/pic-010108157l/gretsch-guitars-g6120t-players-edition-nashville-os.jpg",
        description: "",
        tags: ["guitarra", "guitarras", "electrica", "eléctrica", "gretsch", "de cuerda", "caja hueca"]
    }
];

async function seed() {
    await connectMongoDB();
    try {
        console.log("Eliminando productos existentes...");
        await Product.deleteMany({});
        console.log("Insertando productos nuevos...");
        await Product.insertMany(allProducts);
        console.log("¡Productos insertados con éxito!");
    } catch (error) {
        console.error("Error al insertar productos:", error);
    } finally {
        mongoose.connection.close();
        process.exit(0);
    }
}

seed();
