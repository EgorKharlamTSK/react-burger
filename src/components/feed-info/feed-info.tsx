import styles from "./feed-info.module.css"
import {IWsFeed, IWsFeedsItem} from "../../utils/types";
import {FC} from "react";

interface IData {
    data: IWsFeed
}
export const FeedInfo:FC<IData> = ({data}) => {
    return (
      <div className={styles.main}>
          <div className={styles.readyInWork}>
              <div className='mr-9'>
                  <p className="text text_type_main-medium">
                  Готовы:
                  </p>
                  <div className={styles.columnContainer}>
                      <ul className={styles.lists}>
                          {data &&
                              data.orders.slice(0, 10).map((feed: IWsFeedsItem) => {
                                  if (feed.status === "done") {
                                      return (
                                          <li key={feed.number}>
                                              <p className={`text text_type_main-default ${styles.readyFont}`}>
                                                  {feed.number}
                                              </p>
                                          </li>
                                      )
                                  }
                              })
                          }
                      </ul>
                  </div>
              </div>
              <div>
                  <p className="text text_type_main-medium">
                  В работе:
                  </p>
                  <div>
                      <ul>
                          {data &&
                              data.orders.slice(0, 10).map((feed: IWsFeedsItem) => {
                                  if (feed.status !== "done") {
                                      return (
                                          <li key={feed.number}>
                                              {feed.number}
                                          </li>
                                      )
                                  }
                              })
                          }
                      </ul>
                  </div>
              </div>
          </div>
          <div>
              <p className="text text_type_main-medium">
                  Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">
                  {data?.total}
              </p>
          </div>
          <div>
              <p className="text text_type_main-medium">
                  Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">
                  {data?.totalToday}
              </p>
          </div>
      </div>
    )
}