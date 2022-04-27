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

<section id="contact">
    <h2 class="section-title">Связаться с нами</h2>
    <div class="section-content">
        <Button buttonsClass="floating" imagePath="/img/envelope-solid.svg" />
        <Button buttonsClass="floating" imagePath="/img/telegram.svg" />
    </div>
</section>

<Footer appVersion={config.version} />

<style>
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
        height: 300px;
        width: 185.9px;
        background-image: url("/img/sufflain-colored-outline.svg");
        background-repeat: no-repeat;
        background-size: contain;
        margin-bottom: 6rem;
    }

    #hero p {
        margin-top: 1.3rem;
        margin-bottom: 4rem;
    }

    section {
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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

    .section-content {
        justify-content: center;
        align-items: center;
        display: flex;
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
        gap: 1rem;
    }
</style>