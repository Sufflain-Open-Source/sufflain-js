<script>
    import config from "../../cli-config.js";
    import Button from "../components/Button.svelte";
    import Footer from "../components/Footer.svelte";
    import { onMount } from "svelte";

    onMount(() => document.querySelector("body").classList.toggle("landing"));
</script>

<section id="hero">
    <div class="logo" />
    <h1 class="app-title">Sufflain</h1>
    <p>Удобные расписания занятий КБТ с выбором по группе или преподавателю</p>

    <Button
        text="Запустить Sufflain"
        buttonsClass="mainButton"
        onClick={() => window.open("/welcome")}
    />

    <a id="learn-more" href="#no-manual-search">Узнать больше</a>
</section>

<section id="no-manual-search">
    <div class="section-content">
        <img
            src="/img/no-manual-search.png"
            alt="no manual search screenshot"
        />
        <div class="section-text">
            <h2 class="section-title">Больше не нужно искать вручную.</h2>
            <p>
                Достаточно осуществить выбор один раз.<br /><br />
                В дальнейшем его можно изменить в настройках.
            </p>
        </div>
    </div>
</section>

<section id="adaptive">
    <div class="section-content">
        <div class="section-text">
            <h2 class="section-title">Всегда под рукой.</h2>
            <p>
                Адаптивный интерфейс одинаково хорошо выглядит на экране любого
                размера.
            </p>
        </div>
        <img
            src="/img/adaptive-interface.png"
            alt="adaptive interface screenshot"
        />
    </div>
</section>

<section id="teacher-interface">
    <div class="section-content">
        <img
            src="/img/teacher-interface.png"
            alt="teacher interface screenshot"
        />
        <div class="section-text">
            <h2 class="section-title">Вы преподаватель?</h2>
            <p>
                Даже занятия с несколькими группами на одной паре собраны
                вместе.
            </p>
        </div>
    </div>
</section>

<section id="student-interface">
    <div class="section-content">
        <div class="section-text">
            <h2 class="section-title">Вы студент?</h2>
            <p>Вы всегда будете в курсе того, в какой аудитории пара.</p>
        </div>
        <img
            src="/img/student-interface.png"
            alt="student interface screenshot"
        />
    </div>
</section>

<section id="how-it-works">
    <div class="section-content">
        <div class="section-text">
            <h2 class="section-title">Как это работает?</h2>
            <p>
                Каждые полчаса трекер расписаний Sufflain проверяет блог КБТ на
                изменения в расписании.<br /><br />
                Если они присутствуют - данные кэшируются.
            </p>
        </div>
        <video src="/demo/tracker.mp4" controls />
    </div>
</section>

<section id="contact">
    <h2 class="section-title">Связаться с нами</h2>
    <div class="section-content">
        <Button
            isAnchor="true"
            onClick={"mailto:sufflain@mail.ru"}
            buttonsClass="floating"
            imagePath="/img/envelope-solid.svg"
        />
        <Button
            isAnchor="true"
            onClick={"https://t.me/painsufflain"}
            buttonsClass="floating"
            imagePath="/img/telegram.svg"
        />
    </div>
</section>

<Footer appVersion={config.version} />

<style>
    :root {
        --logo-width: 9.925rem;
        --logo-height: 15rem;
    }

    a {
        color: var(--dark-red);
        scroll-behavior: smooth;
        text-decoration: underline;
    }

    #learn-more {
        margin-top: 2rem;
    }

    a:hover {
        color: var(--medium-red);
    }

    .logo {
        height: var(--logo-height);
        width: var(--logo-width);
        background-image: url("/img/sufflain-colored-outline.svg");
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: 6rem;
    }

    #hero p {
        margin-top: 1.3rem;
        margin-bottom: 4rem;
        text-align: center;
    }

    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 1rem 0 1rem;
    }

    section:not(:nth-of-type(1)) {
        justify-content: center;
        align-items: center;
        gap: 4rem;
        margin: 0 auto 0 auto;
    }

    section:nth-child(even) {
        background-color: rgba(132, 207, 255, 0.2);
    }

    section:last-of-type {
        gap: 0;
    }

    section:last-of-type h2 {
        margin-bottom: 4rem;
    }

    section img {
        max-width: 20.83rem;
        box-shadow: var(--default-shadow);
        border-radius: 1.11rem;
    }

    section video {
        max-width: 40rem;
        box-shadow: var(--default-shadow);
    }

    .section-content {
        justify-content: center;
        align-items: center;
        display: flex;
        padding: 0 2rem 0 2rem;
        gap: 16rem;
    }

    .section-content p {
        max-width: 300px;
    }

    #contact .section-content {
        gap: 4rem;
    }

    .section-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 1rem;
    }

    @media (max-width: 1336px) {
        #no-manual-search h2 {
            max-width: 350px;
        }
    }

    @media (max-width: 1024px) {
        .section-content {
            flex-direction: column;
            gap: 4rem;
            justify-content: center;
            align-items: center;
        }

        #no-manual-search img,
        #teacher-interface img {
            order: 2;
        }
    }

    @media (max-height: 1024px) and (max-width: 740px) {
        .logo {
            width: calc(var(--logo-width) / 2);
            height: calc(var(--logo-height) / 2);
        }

        section img {
            max-width: 50vw;
        }

        section video {
            max-width: 100%;
        }

        section:last-of-type {
            padding-bottom: 4rem;
        }
    }

    @media (orientation: landscape) and (max-height: 800px) and (max-width: 1024px) {
        section {
            height: 100vw;
        }

        section img {
            max-width: 30vw;
        }
    }

</style>
