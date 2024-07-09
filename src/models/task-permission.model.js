import mongoose from "mongoose";

const { Schema } = mongoose;

const taskPermissionSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
  permission: {
    type: String,
    enum: ["owner", "collaborator", "viewer"],
    default: "owner",
  },
});

export default mongoose.model("TaskPermission", taskPermissionSchema);
