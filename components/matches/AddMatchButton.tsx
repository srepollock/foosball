"use client";

type AddMatchButtonProps = {
    onClick: () => void;
};
export default async function AddMatchButton(props: AddMatchButtonProps) {
    return (
        <div>
            <button onClick={props.onClick}>Add Match</button>
        </div>
    );
}
