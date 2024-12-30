import React from 'react'
import styles from "../../styles/About.module.css"


export const AboutDrinks = () => {
    return (
        <div className={styles.aboutContainer}>
            <h3 className={styles.aboutH3}>Безалкогольні напої</h3>
            <span className={styles.aboutText}>Смакувати улюбленими ролами ще приємніше, якщо обрати до них напої. Тепер вам не доведеться витрачати час і йти до супермаркету. Обрати безалкогольний напій можна в меню Monosushi. Просто додайте варіант, який вам сподобався, у кошик, та оформіть замовлення.</span>
            <h1 className={styles.aboutH1}>Які безалкогольні напої є в Monosushi?</h1>
            <span className={styles.aboutText}>
                Смачні, свіжі, різноманітні! Наша команда — це справжні перфекціоністи. Тож ми подбали про те, щоб ви могли замовити лише добірну продукцію від надійних виробників.

                Смакувати суші приємніше з:
                <ul >
                    <li> соком;</li>
                    <li>  фантою;</li>
                    <li> кока-колою.</li>
                </ul>
                Меню напоїв лише ростиме з часом, тож ви гарантовано зможете обрати варіант, який до душі саме вам. Смак суші буде лише яскравішим з вдало обраним напоєм.

                Замовити безалкогольні напої — так само просто, як і ваші улюблені страви. Додайте напій у кошик, залиште свої контактні дані, та дочекайтеся дзвінка менеджера. Ми передзвонимо вам за декілька хвилин й уточнимо всі деталі замовлення. Доставляємо напої та суші справді швидко. Всього 43 хвилини — 1 година, і замовлення буде біля ваших дверей!
            </span>
        </div>
    )
}
