import { useState, useContext, useEffect } from "react";
import DateContext from "../../context/date";
import dayjs from "dayjs";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import food from "../../assets/food.png";
import AddIcon from "@mui/icons-material/Add";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import { v4 as uuidv4 } from "uuid";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import "./Panel.css";
// import { Divider } from "@mui/material";
// import { Divider } from "antd";

let menuItems = [
    { id: "10", name: "Chicken ", meal: "1", added: false },
    { id: "20", name: "Spaghetti", meal: "2", added: false },
    { id: "30", name: "Grilled ", meal: "3", added: false },
    { id: "40", name: "Chicken ", meal: "4", added: false },
];

const MealPlanner = () => {
    const { date, MEALS } = useContext(DateContext);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredItems, setFilteredItems] = useState(menuItems);
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const filtered = menuItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
        setFilteredItems(filtered);
    }, [searchQuery]);

    const editable = () => {
        setIsEdit(!isEdit);
        setIsReady(false);
    };

    const handleEditStatus = () => {
        setIsReady(true);
    };

    const handleTextChange = (text, item) => {
        const newArray = [...items];
        const index = newArray.findIndex((obj) => obj.id === item.id);
        const updatedObject = { ...newArray[index], name: text };
        newArray.splice(index, 1, updatedObject);
        setItems(newArray);
    };
    //"13ac685d-3fde-4630-8a1b-7681419dfca3"

    const handleClick = (e) => {
        // const found = items.filter((item) => item.added === false);
        // if (found) {
        //     const index = found?.findIndex((item) => item?.id === e);
        //     menuItems = [...menuItems, items[index]];
        //     setFilteredItems(menuItems);
        //     // console.log(items, e);
        //     const newItems = items.filter((item) => item?.id !== e);
        //     setItems(newItems);
        //     // console.log(filteredItems, menuItems);
        // } else {
        //     const newItems = items.filter((item) => item.id !== e);
        //     setItems(newItems);
        // }
        const found = items.find((item) => item.id === e);
        if (found.added === true) {
            const newItems = items.filter((item) => item.id !== e);
            setItems(newItems);
        } else {
            menuItems = [...menuItems, found];
            setFilteredItems(menuItems);
            const newItems = items.filter((item) => item.id !== e);
            setItems(newItems);
        }
    };

    const BootstrapTooltip = styled(({ className, ...props }) => <Tooltip {...props} arrow classes={{ popper: className }} />)(({ theme }) => ({
        [`& .${tooltipClasses.arrow}`]: {
            color: "#254974",
        },
        [`& .${tooltipClasses.tooltip}`]: {
            padding: 10,
            backgroundColor: "#254974",
        },
    }));

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }

        const sourceMealId = result.source.droppableId;
        const destinationMealId = result.destination.droppableId;

        if (sourceMealId !== destinationMealId) {
            if (sourceMealId === "menuItems") {
                const dragObj = result.draggableId;
                const newItems = [...items, filteredItems.find((item) => item.id === dragObj)];
                newItems[newItems.findIndex((item) => item?.id === dragObj)].meal = destinationMealId;

                const index = filteredItems.findIndex((item) => item?.id === dragObj);

                // check if the object exists
                if (index !== -1) {
                    // remove the object
                    menuItems.splice(index, 1);
                    setFilteredItems(menuItems);
                    setItems(newItems);
                }
            } else {
                if (destinationMealId !== "menuItems") {
                    const newItems = Array.from(items);
                    const [reorderedItem] = newItems.splice(result.source.index, 1);
                    // Update the meal value of the reordered item
                    reorderedItem.meal = destinationMealId || "";

                    newItems.splice(result.destination.index, 0, reorderedItem);
                    setItems(newItems);
                }
            }
        } else {
            if (destinationMealId !== "menuItems") {
                const newItems = Array.from(items);
                const [reorderedItem] = newItems.splice(result.source.index, 1);
                newItems.splice(result.destination.index, 0, reorderedItem);
                setItems(newItems);
            }
        }
        // setIsOpen(false);
    };

    return (
        <div className=" p-4">
            <div className="font-[800] lg:text-3xl sm:text-2xl text-2xl w-full text-white flex flex-row gap-2 justify-center items-center select-none mt-4">
                <div className="cursor-pointer ">{dayjs(date).format("dddd")}</div>
            </div>

            <DragDropContext onDragEnd={onDragEnd}>
                <div className="flex flex-row ml-10 mt-10 justify-between">
                    <div>
                        {isEdit && (
                            <div className="absolute text-xl w-[50%] -translate-y-3 text-gray-400 flex items-center justify-center">
                                <span>You can edit now</span>
                                <div className="ml-1 animate-bounce">
                                    <KeyboardDoubleArrowDownIcon />
                                </div>
                            </div>
                        )}
                        {MEALS.map((meal) => (
                            <div className="flex flex-row w-[50%] " key={meal.id}>
                                <div className="flex flex-col mt-7 w-[20%] text-white">
                                    <div className="text-sm -mb-2 text-gray-400 font- select-none w-[70px]">{meal.time}</div>
                                    <div className="text-lg font-bold select-none">{meal.name}</div>
                                </div>
                                <div className="">
                                    {
                                        <div className="flex flex-col items-start justify-center ml-[40px] w-[200px]">
                                            <Droppable droppableId={meal.id}>
                                                {(provided) => (
                                                    <>
                                                        <div {...provided.droppableProps} ref={provided.innerRef} className="bg-gray-100 mt-6 rounded-3xl p-2 ml-[50%] w-[30vw] min-h-[50px] h-auto ">
                                                            {items.length === 0 && (
                                                                <span className="flex items-center justify-center mt-1 text-gray-600 select-none">....Drag Over The Food Items....</span>
                                                            )}
                                                            {items.length > 0 &&
                                                                items.map((item, index) => {
                                                                    if (item?.meal === meal.id) {
                                                                        return (
                                                                            <Draggable key={item.id} draggableId={item.id} index={index}>
                                                                                {(provided) => (
                                                                                    <div
                                                                                        {...provided.draggableProps}
                                                                                        {...provided.dragHandleProps}
                                                                                        ref={provided.innerRef}
                                                                                        onClick={handleEditStatus}
                                                                                        className="bg-gray-200 rounded-xl px-4 py-1 items-center justify-center flex flex-row mb-2 mt-2 font-bold text-xl select-none"
                                                                                    >
                                                                                        {isEdit && isReady && item.added ? (
                                                                                            <input
                                                                                                onChange={(e) => {
                                                                                                    handleTextChange(e.target.value, item);
                                                                                                }}
                                                                                                value={item.name}
                                                                                                type="text"
                                                                                            ></input>
                                                                                        ) : (
                                                                                            item.name
                                                                                        )}
                                                                                        <ClearRoundedIcon
                                                                                            fontSize="medium"
                                                                                            onClick={() => {
                                                                                                handleClick(item.id);
                                                                                            }}
                                                                                            className="ml-auto mr-2 interactable "
                                                                                        />
                                                                                    </div>
                                                                                )}
                                                                            </Draggable>
                                                                        );
                                                                    } else {
                                                                        return null;
                                                                    }
                                                                })}
                                                            {provided.placeholder}
                                                        </div>
                                                    </>
                                                )}
                                            </Droppable>
                                            <button
                                                data-type="add"
                                                className="flex items-center justify-center ml-[50%] text-gray-500 font-bold text-lg rounded-3xl border-dashed border  w-[30vw] min-h-[50px] hover:text-gray-300 transition-colors duration-300 mt-4 mb-20 interactable select-none"
                                                onClick={() => {
                                                    const newItem = {
                                                        id: uuidv4(),
                                                        name: "Item added",
                                                        meal: meal.id,
                                                        added: true,
                                                    };
                                                    setItems([...items, newItem]);
                                                }}
                                            >
                                                <AddIcon fontSize="medium" className="mr-2" />
                                                <span>Add item</span>
                                            </button>
                                        </div>
                                    }
                                    <section className="absolute -translate-x-24 -translate-y-8 h-[2px] w-[100%] bg-slate-700"></section>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="-mt-8">
                        <div>
                            <div className="absolute -translate-y-4 w-24 h-24 scale-[2] mt-4 z-1">
                                <img alt="" src={food} />
                            </div>
                            <div className="relative z-10 mr-20 flex flex-col gap-4">
                                <button onClick={editable} className="bg-gray-200 z-10 transition-colors hover:bg-gray-400 rounded-xl p-2 w-10 ml-auto interactable">
                                    {isEdit ? (
                                        <BootstrapTooltip title="Edit Done">
                                            <DoneAllRoundedIcon />
                                        </BootstrapTooltip>
                                    ) : (
                                        <EditRoundedIcon />
                                    )}
                                </button>
                                <button
                                    type="button"
                                    className="bg-gray-200 z-10 text-gray-900 font-semibold py-2 px-4 rounded-xl inline-flex items-center interactable select-none transition-colors hover:bg-gray-400"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(!isOpen);
                                    }}
                                >
                                    {!isOpen && <span className="mr-2">{filteredItems.length === 0 ? "No items found" : searchQuery || "Select an item"}</span>}
                                    {isOpen && (
                                        <input
                                            type="text"
                                            className="bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-xl inline-flex items-center interactable transition-colors hover:bg-gray-200 select-none "
                                            value={searchQuery}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}
                                            onChange={(e) => {
                                                e.stopPropagation();
                                                setSearchQuery(e.target.value);
                                            }}
                                            placeholder="Search items"
                                        />
                                    )}
                                    <SearchRoundedIcon sx={{ marginLeft: 1 }} />
                                </button>
                            </div>
                        </div>
                        {isOpen && (
                            <div className="absolute z-10 mt-2 w-[12%] bg-white rounded-lg shadow-lg">
                                <Droppable droppableId="menuItems">
                                    {(provided) => (
                                        <ul className="py-2" {...provided.droppableProps} ref={provided.innerRef}>
                                            {filteredItems.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className="bg-white hover:bg-gray-400 transition-colors ease-linear duration-300 rounded p-2 mb-2 mt-2 interactable select-none"
                                                        >
                                                            {item.name}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable>
                            </div>
                        )}
                    </div>
                </div>
            </DragDropContext>
        </div>
    );
};

export default MealPlanner;

/*{/* <Droppable droppableId="menuItems">
                                    {(provided) => (
                                        <ul className="py-2" {...provided.droppableProps} ref={provided.innerRef}>
                                            {menuItems.map((item, index) => (
                                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            ref={provided.innerRef}
                                                            className="bg-white hover:bg-gray-400 transition-colors ease-linear duration-300 rounded p-2 mb-2 interactable"
                                                        >
                                                            {item.name}
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </ul>
                                    )}
                                </Droppable> */

/* <button
                                type="button"
                                className="bg-gray-200 text-gray-900 font-semibold py-2 px-4 rounded-xl inline-flex items-center interactable transition-colors hover:bg-gray-400"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <span className="mr-2">{"Select an item"}</span>
                                <svg className={`fill-current h-4 w-4 ${isOpen ? "-rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M6 8l4 4 4-4"></path>
                                </svg   `>
                            </button> */
