import type { IGroup } from "./ChatWindow";

interface IUser {
  _id: string;
  name: string;
  profilePic: string;
}

export default function AddUserModal({
  users,
  group,
  addMembers,
  closeModal,
}: {
  users: IUser[];
  group: IGroup | null;
  addMembers: (userId: string) => void;
  closeModal: () => void;
}) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-xl">
      <div className="bg-[#111827] w-72 max-h-60 p-3 rounded-lg">
        <div className="flex justify-between mb-2">
          <p className="text-sm font-semibold text-white">Add Users</p>
          <button
            onClick={closeModal}
            className="text-xs bg-red-500 px-2 py-1 rounded"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto max-h-40 space-y-1">
          {users.map((u) => {
            const alreadyMember = group?.members.some(
              (m) => m._id === u._id
            );

            return (
              <div
                key={u._id}
                className="flex justify-between items-center bg-[#374151] px-2 py-1 rounded"
              >
                <span className="text-sm text-white">{u.name}</span>

                {alreadyMember ? (
                  <span className="text-xs bg-gray-500 px-2 py-1 rounded">
                    Already added
                  </span>
                ) : (
                  <button
                    onClick={() => addMembers(u._id)}
                    className="bg-green-600 text-xs px-2 py-1 rounded"
                  >
                    Add
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}