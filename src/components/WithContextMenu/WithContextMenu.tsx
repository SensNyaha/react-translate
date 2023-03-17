import { ContextMenu, ContextMenuItem, ContextMenuTrigger } from "rctx-contextmenu";

interface IWithContextMenuProps {
    triggerClass: string,
    triggerText: string,
    menuItems: Array<IMenuItem>
}

interface IMenuItem {
    itemClass: string,
    itemText: string,
    itemOnClickF: () => void,
}

const WithContextMenu = ({ triggerText, triggerClass, menuItems }: IWithContextMenuProps) => {
    return ( 
        <>
            <ContextMenuTrigger id={`main-result-${triggerText}`}>
                <div 
                    className={triggerClass}
                >
                    {triggerText}
                </div>
            </ContextMenuTrigger>
            <ContextMenu 
                id={`main-result-${triggerText}`}
                hideOnLeave={true}    
            >
                {
                    menuItems.map(item => {
                        return (
                            <ContextMenuItem >
                                <div
                                    onClick={item.itemOnClickF}
                                    className={item.itemClass}
                                >
                                    {item.itemText}
                                </div>
                            </ContextMenuItem>
                        )
                    })
                }
                
            </ContextMenu>
        </>
    );
}
 
export default WithContextMenu;