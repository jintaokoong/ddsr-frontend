import { useCallback, useEffect, useState } from "preact/hooks";
import { css } from "@emotion/css";
import apiService from "./services/api-service";

const mainStyle = css`
  max-width: 420px;
  min-height: 100vh;
  background-color: #d1ebff;
  margin: auto;
`;

const headerStyle = css`
  margin: 0px;
  padding: 0.4rem;
  font-weight: 500;
  color: #004f8f;
  background-color: #90ceff;
`;

const listingWrapperStyle = css`
  margin: 10px;
`;

const labelStyle = css`
  color: #1b78c3;
  margin-left: 10px;
`;

const slicedLabelStyle = css`
  ${labelStyle}
  text-decoration: line-through;
  color: #618fb5;
`;

const headerInputStyle = css`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
  border-width: 2px;
  border-color: #004f8f;
  padding: 0 10px;
  border-radius: 3px;
  max-width: calc(100% - 20px);
  margin: 10px;
`;

export function App() {
  const [grouping, setGrouping] = useState<Record<string, any[]>>({});
  const [name, setName] = useState("");
  useEffect(() => {
    apiService.getRequests().then((gps) => setGrouping(gps));
  }, []);

  const onClickHandler = useCallback(
    (id: string, value: boolean) => () => {
      apiService
        .updateRequest({ _id: id, done: value })
        .then(() => {
          apiService
            .getRequests()
            .then((gps) => setGrouping(gps))
            .catch((err) => console.error("post-update", err));
        })
        .catch((err) => console.error("update", err));
    },
    []
  );

  return (
    <main className={mainStyle}>
      <input
        placeholder={"手動加歌"}
        className={headerInputStyle}
        value={name}
        onInput={(e) => setName(e.currentTarget.value)}
        onKeyPress={(e) => {
          if (e.key !== "Enter") {
            return;
          }
          apiService
            .createRequest(name)
            .then(() =>
              apiService.getRequests().then((gps) => setGrouping(gps))
            )
            .catch((err) => console.error("post-create", err));
          setName("");

          // do api call
        }}
      />
      {Object.keys(grouping).map((k) => (
        <div key={k}>
          <h4 className={headerStyle}>{k}</h4>
          {grouping[k].map((rq) => (
            <div className={listingWrapperStyle} key={rq._id}>
              <label>
                <input
                  type={"checkbox"}
                  checked={rq.done}
                  onClick={onClickHandler(rq._id, !rq.done)}
                />
                <span className={rq.done ? slicedLabelStyle : labelStyle}>
                  {rq.name}
                </span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <footer
        style={{
          zIndex: "999",
          position: "absolute",
          background: "#3ca9ff",
          color: "#004f8f",
          textAlign: "center",
          padding: "5px 0",
          maxWidth: "420px",
          width: "100%",
          bottom: 0,
        }}
      >
        v1.0.0
      </footer>
    </main>
  );
}
