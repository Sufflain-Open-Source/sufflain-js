<!-- 
Copyright (C) 2022 Timofey Chuchkanov

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
-->

<script>
    export let link;
    export let title;
</script>

<a class="link-card hoverable-with-gradient" href={ link }>{ title }</a>

<style>
    a.link-card {
        display: block;
        padding: 1.11rem .55rem 1.11rem .55rem;
        margin: 2.22rem 1.11rem 0 1.11rem;
        color: var(--dark-red);
        background-color: var(--light-blue);
        box-shadow: var(--default-shadow);
        text-align: center;
        border-radius: 1.11rem;
    }

    a.link-card:hover {
        background: none;
        color: var(--light-blue);
    }

    @media (min-width: 550px) {
        a.link-card {
            width: 500px;
        }
    }
</style>
