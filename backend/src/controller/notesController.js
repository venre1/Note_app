import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
  try{
     const notes = await Note.find().sort({createdAt:-1})
     res.status(200).json(notes)
  }catch(error){
    console.error("Error in getAllNotes controller", error);
     res.status(500).json({message:"Internal server error"});
  }
}

export async function getNotesById(req, res) {
  try{
     const note = await Note.findById(req.params.id)
     if(!note) return res.status(404).json({message:"Note not found"});
     res.status(200).json(note)
  }catch(error){
    console.error("Error in getNotesById controller", error);
     res.status(500).json({message:"Internal server error"});
  }
}

export async function createNote(req, res) {
  try{
     const { title, content } = req.body
     const newNote = new Note({title,content})

    const savedNotes= await newNote.save()
     res.status(201).json(savedNotes)
  }catch(error){
      console.error("Error in createNote controller", error);
     res.status(500).json({message:"Internal server error"});
  }
}

export async function updateNote(req, res) {
 try{
    const {title, content} = req.body
    const updatedNote= await Note.findByIdAndUpdate(req.params.id, {title, content},{new:true});

    if (!updatedNote) return res.status(404).json({message:"Note not found"});
    res.status(200).json({message:"Note updated successfully"})
 }catch(error){
     console.error("Error in update controller", error);
     res.status(500).json({message:"Internal server error"});
 }
}

export async function deleteNote(req, res) {
  try{
     const deleteNote = await Note.findByIdAndDelete(req.params.id)
     if(!deleteNote) return res.status(404).json({message:"Note not found"});
    res.json({message:"Note deleted successfully"})
  }catch(error){
     console.error("Error in delete controller", error);
     res.status(500).json({message:"Internal server error"});
  }
}
