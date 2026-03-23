interface IGroup {
  _id: string;
  name: string;
  groupDp: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function GroupItem({
  selectedGroup,
  groups,
}: {
  selectedGroup: (group: any) => void;
  groups: IGroup[];
}) {
  return (
    <div>
      {groups.map((g) => (
        <div
          key={g._id}
          onClick={() => selectedGroup(g)}
          className="flex items-center gap-3 px-4 py-3 hover:bg-[#202c33] hover:rounded-md cursor-pointer"
        >
          <div className="w-11 h-11 rounded-full  flex items-center justify-center text-white">
            <img
              className="h-auto w-auto object-contain rounded-full"
              src={g.groupDp}
            />
          </div>

          <div className="flex flex-col">
            <p className="text-white text-sm font-medium">{g.name}</p>

            <p className="text-xs text-gray-400">Last message preview...</p>
          </div>
        </div>
      ))}
    </div>
  );
}
