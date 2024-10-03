const fs = require("fs")
// const http = require("http")
const express = require("express")

const app = express();

// middlewae untuk membaca json dari request body(client, FE. dll)
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        status: "Success",
        message: "Application is running good...",
    });
});

app.get("/nanda", (req, res) => {
    res.status(200).json({
        message: "Ping Successfully !",
    });
});

const cars = JSON.parse(
    fs.readFileSync(`${__dirname}/assets/data/cars.json`, "utf-8")
);

// /api/v1/(collection) => collection harus jamak contoh car menjadi cars
app.get("/api/v1/cars", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Success get cars data!",
        IsSuccess: true,
        totalData: cars.length,
        data: {
            cars,
        },
    });
});

app.post("/api/v1/cars", (req, res) => {
    const newCar = req.body;
    cars.push(newCar);

    fs.writeFile(`${__dirname}/assets/data/cars.json`, JSON.stringify(cars), (err) => {
        res.status(201).json({
            status: "success",
            message: "Success get cars data!",
            IsSuccess: true,
            totalData: cars.length,
            data: {
                car: newCar,
            },
        });
    });

    res.status(200).json({
        status: "success",
        message: "Succes get cars data!",
        isSuccess: true,
        data: cars,
    });
});

app.get("/api/v1/cars/:id", (req, res) => {
    // select * from .....
    const id = req.params.id * 1;
    console.log("typeof id: ");
    console.log(id);
    // console.log(typeof id);

    // == maka tidak peduli tipe datanya apa, kalau sama "10"  == 10 = TRUE
    // === jika 10 === "10" = FALSE, karena tipe ddata berbeda

    const car = cars.find((i) => i.id === id);
    console.log(car);

    // basic error handling
    if (!car) {
        console.log("data kosong cuy")
        return res.status(404).json({
            status: "Filed",
            message: `Filed get cars data from this id: ${id}`,
            IsSuccess: false,
            data: null,
        });
    }

    res.status(200).json({
        status: "success",
        message: "Success get cars data!",
        IsSuccess: true,
        data: {
            car,
        },
    });
});

// middleware / handler untuk url yang tidak dapat diakses
// middleware = our own middleware
app.use((req, res, next) => {
    res.status(404).json({
        status: "Failed",
        message: "API not exist !!!",
    });
});

app.listen("3000", () => {
    console.log("start aplikasi kita di port 3000")
});
