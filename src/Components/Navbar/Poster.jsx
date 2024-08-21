import styles from "../../styles/Poster.module.css";




function Poster() {

    //     const slideSales = [
    //         {
    //         url1:
    //     }
    // ]

    return (<div className={styles.saleContainer}>
        <div className={styles.poster}>

            <div className={styles.post1}>post1</div>
            <div className={styles.post2}>post2</div>

        </div>
        <div className={styles.sliddeNav}>
            <input type="radio" name="" id="" />
            <input type="radio" name="" id="" />
            <input type="radio" name="" id="" />
            <input type="radio" name="" id="" />
        </div>
    </div>);
}

export default Poster;