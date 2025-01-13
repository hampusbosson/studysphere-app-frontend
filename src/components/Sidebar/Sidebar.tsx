import { Class } from "../../utils/classUtils";

interface SideBarProps {
  classes: Class[];
}

const SideBar: React.FC<SideBarProps> = ({ classes }) => {

    if (!Array.isArray(classes)) {
        console.error("Expected classes to be an array, got:", classes);
        return <div>Error loading classes</div>;
      }
    

  return (
    <div className="border-r border-gray-800 flex flex-col h-full p-4">
      <p className="font-bold text-lg mb-4">My Classes</p>
      <ul className="space-y-2">
        {classes.map((classItem, index) => (
          <li key={index} className="text-gray-300 hover:text-white cursor-pointer">
            {classItem.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;