"use client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {BiTrash} from "react-icons/bi";
import {useState} from "react";
import {Input} from "@/components/ui/input";

function DeleteModal({title, desc, password, onClick}) {

    const [keyword, setKeyWord] = useState("")

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <BiTrash size={24} className="cursor-pointer"/>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        {title}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        {desc}
                    </AlertDialogDescription>
                    <p>
                        In order to delete invoice, please type <strong>{password}</strong> in the input field below.
                    </p>
                    <Input
                        type="text"
                        placeholder="keyword"
                        onChange={(e) => setKeyWord(e.target.value)}
                    />
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {keyword === password && (
                        <AlertDialogAction onClick={onClick}>
                            Delete
                        </AlertDialogAction>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    );
}

export default DeleteModal;