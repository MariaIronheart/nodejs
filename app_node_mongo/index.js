const express = require('express');
const mongoose = require("mongoose");
const connectDB = require("./config/db.js"); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (request, response) => {
    response.send({ message: "Hello from an Express API!" });
});

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});


const usuarioSchema = new mongoose.Schema({
    nome: String,
    idade: Number,
  });
  
const usuarioModel = mongoose.model('usuarios', usuarioSchema);


app.get('/usuarios', async (req, res) => {
    try {
        const model = await usuarioModel.find();
        res.json(model);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/usuarios', async (req, res) => {
    const model = new usuarioModel(req.body);
  
    try {
      const novoExemplo = await model.save();
      res.status(201).json(novoExemplo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const model = await usuarioModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!model) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }
  
      res.json(model);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const model = await usuarioModel.findByIdAndDelete(id);
      if (!model) {
        return res.status(404).json({ message: 'Item não encontrado' });
      }
  
      res.json({ message: 'Item excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });