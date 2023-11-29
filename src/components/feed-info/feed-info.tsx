import styles from "./feed-info.module.css"
export const FeedInfo = () => {
    return (
      <div className={styles.main}>
          <div className={styles.readyInWork}>
              <div className='mr-9'>
                  <p className="text text_type_main-medium">
                  Готовы:
                  </p>
                  <div>
                      <ul className={styles.lists}>
                          <li>
                              <p className={`text text_type_main-default ${styles.readyFont}`}>
                                  3213123123213
                              </p>
                          </li>
                          <li>
                              <p className={`text text_type_main-default ${styles.readyFont}`}>
                                  3213123123213
                              </p>
                          </li>
                          <li>
                              <p className={`text text_type_main-default ${styles.readyFont}`}>
                                  3213123123213
                              </p>
                          </li>
                          <li>
                              <p className={`text text_type_main-default ${styles.readyFont}`}>
                                  3213123123213
                              </p>
                          </li>
                      </ul>
                  </div>
              </div>
              <div>
                  <p className="text text_type_main-medium">
                  В работе:
                  </p>
                  <div>
                      <ul>
                          <li><p>3213123123213</p></li>
                          <li><p>3213123123213</p></li>
                      </ul>
                  </div>
              </div>
          </div>
          <div>
              <p className="text text_type_main-medium">
                  Выполнено за все время:
              </p>
              <p className="text text_type_digits-large">
                  28752
              </p>
          </div>
          <div>
              <p className="text text_type_main-medium">
                  Выполнено за сегодня:
              </p>
              <p className="text text_type_digits-large">
                  138
              </p>
          </div>
      </div>
    )
}