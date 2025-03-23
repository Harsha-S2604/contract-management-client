import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./dialog";
import { Button } from "./button";

const DeleteDialogConfirmation = (props) => {
    const [loading, setLoading] = useState(false);

    const { dialogOpen, setDialogOpen, deleteCB, args = []} = props
    const confirmationMessage = props?.confirmationMessage || "Are you sure you want to delete?"
    const deleteDescription = props?.deleteDescription || "Deleting this will delete all related data. This action is permanent and cannot be reverted."

    const handleDelete = async () => {
        setLoading(true);
        await deleteCB(...args);
        setLoading(false);
        setDialogOpen(false);
    }


    return ( 
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="space-y-4 p-6">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-red-600">{confirmationMessage}</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    {deleteDescription}
                </DialogDescription>
                <DialogFooter className="space-x-4">
                    <Button className="cursor-pointer" variant="destructive" onClick={handleDelete} disabled={loading}>
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                    <Button className="cursor-pointer" variant="secondary" onClick={() => setDialogOpen(false)} disabled={loading}>
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteDialogConfirmation