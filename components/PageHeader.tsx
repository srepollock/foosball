import NavMenu from "./navmenu/NavMenu";

type PageHeaderProps = {
    pageName: string;
};

export default function PageHeader(props: PageHeaderProps) {
    return (
        <div className="w-full">
            <NavMenu pageName={props.pageName} />
        </div>
    );
}
