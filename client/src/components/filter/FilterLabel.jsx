export function FilterLabel({ title }) {
    return (<div className={'text-primary px-2 py-1 border-[1px] border-primary rounded-lg w-fit flex items-center space-x-2'}>
            <span>{title}</span>
            <i className="fa-regular fa-xmark cursor-pointer"></i>
        </div>);
}
