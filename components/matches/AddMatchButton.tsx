"use client";

type AddMatchButtonProps = {
    onClick: (e: any) => void;
};
export default function AddMatchButton(props: AddMatchButtonProps) {
    return (
        <div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={props.onClick}>
                    Add Match
            </button>
        </div>
    );
}
