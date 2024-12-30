import React from 'react'
import styles from "../../styles/Footer.module.css"
export const CardFooter = () => {
    return (
        <div className={styles.cardFooter}>
            <h2 className={styles.cardFoot_H2}>Замовте Смачні Суші з Доставкою до Ваших Дверей</h2>
            <h1 className={styles.cardFoot_H1}>Як зробити замовлення:</h1>
            <p className={styles.cardFoot_p}>Просто виберіть ваші улюблені страви з меню на нашому сайті, додайте їх до кошика, і натисніть ‘Замовити’. Ми подбаємо про все інше!</p>

        </div>
    )
}
