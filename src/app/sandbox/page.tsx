import clsx from "clsx";
import Link from "next/link";

const GAP_COLOR = "bg-neutral-800";
const BUTTON =
  "h-3/5 w-12 rounded bg-yellow-400 hover:brightness-125 disabled:opacity-40";

export default function Page() {
  return (
    <main className={clsx("flex w-full grow overflow-hidden", GAP_COLOR)}>
      <div
        id="sidebar"
        className={clsx(
          "flex w-1/6 grow flex-col justify-between border-r bg-amber-400",
        )}
      >
        <div className="flex flex-col divide-y">
          <div className="p-4">Return</div>
          <div className="flex justify-center p-4">Rate</div>
          <div className="flex flex-col gap-2 p-2">
            <Link
              href={""}
              className="rounded bg-yellow-400 p-2 hover:brightness-125"
            >
              Builder
            </Link>
            <Link
              href={""}
              className="rounded bg-yellow-400 p-2 hover:brightness-125"
            >
              Description
            </Link>
            <Link
              href={""}
              className="rounded bg-yellow-400 p-2 hover:brightness-125"
            >
              Settings
            </Link>
          </div>
          <div className="flex justify-center p-4">
            <button className="rounded bg-green-400 px-4 py-1">Save</button>
          </div>
        </div>
        <div className="flex justify-center p-4">Info</div>
      </div>
      <div
        className={clsx(
          "scrollbar flex w-5/6 flex-col gap-2 overflow-x-hidden overflow-y-scroll",
          GAP_COLOR,
        )}
      >
        <div
          id="header"
          className={clsx(
            "mx-2 mt-2 flex h-16 items-center justify-between bg-pink-500",
          )}
        >
          <div className={clsx("flex h-full items-center gap-2")}>
            <h1 className={clsx("text-2xl font-bold")}>CHARACTER NAME</h1>
            <div className={clsx("h-1/2 w-16 rounded bg-yellow-400")}></div>
          </div>
          <div className={clsx("flex h-full items-center gap-2")}>
            <div className={clsx(BUTTON)}>Save</div>
            <div className={clsx(BUTTON)}>Rate</div>
            <div className={clsx(BUTTON)}>Share</div>
          </div>
        </div>
        <div className={clsx("mx-2 mb-2 flex grow gap-2", GAP_COLOR)}>
          <div id="display" className={clsx("w-1/3 bg-orange-400")}>
            <div className="flex flex-col items-center gap-2 rounded border border-blue-300 bg-blue-400 p-2">
              <div className="h-6 w-18 rounded-full border border-red-300 bg-red-400"></div>
              <div className="flex gap-2">
                <div
                  className={clsx("h-82 w-32 border border-red-300 bg-red-400")}
                >
                  Weapon
                </div>
                <div className="flex flex-col gap-2">
                  <div
                    className={clsx(
                      "h-26 w-26 border border-red-300 bg-red-400",
                    )}
                  >
                    Helmet
                  </div>
                  <div
                    className={clsx(
                      "h-26 w-26 border border-red-300 bg-red-400",
                    )}
                  >
                    Chest
                  </div>
                  <div
                    className={clsx(
                      "h-26 w-26 border border-red-300 bg-red-400",
                    )}
                  >
                    Boots
                  </div>
                </div>
              </div>
              <div className="h-24 w-60 border border-red-300 bg-red-400">
                Drifter
              </div>
              <div className="w-60 grow border border-red-300 bg-red-400">
                Stats
              </div>
            </div>
          </div>
          <div id="editor" className={clsx("w-2/3 bg-orange-400")}>
            <div className="flex flex-col items-center">
              <div className="grid h-10 w-11/12 grid-cols-5 gap-2">
                <div className="rounded-t-lg border border-b-0 border-purple-300 bg-purple-400">
                  Equipment
                </div>
                <div className="rounded-t-lg border border-b-0 border-purple-300 bg-purple-400">
                  Drifter
                </div>
                <div className="rounded-t-lg border border-b-0 border-purple-300 bg-purple-400">
                  Support
                </div>
                <div className="rounded-t-lg border border-b-0 border-purple-300 bg-purple-400">
                  Description
                </div>
                <div className="rounded-t-lg border border-b-0 border-purple-300 bg-purple-400">
                  Comments
                </div>
              </div>
              <div className="h-fit w-full rounded border border-purple-300 bg-purple-400 break-all">
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
