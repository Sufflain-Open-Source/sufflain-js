/**
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
    along with this program.  If not, see <https:www.gnu.org/licenses/>.
 */


export function groupLessonsWithSameTime(allGroupsLessonsAggregated) {
    const lessonsTime = allGroupsLessonsAggregated.map(lesson => lesson.time);
    const lessonsGroupedByTime = lessonsTime.map(time => allGroupsLessonsAggregated.filter(lesson => lesson.time == time));

    return lessonsGroupedByTime;
}

export function putAllGroupsLessonsTogether(allGroupsEntries) {
    const allGroupsEntriesData = allGroupsEntries[1].data; // Omit a timetable hash and select the data without linkTitle
    const allGroupsEntriesWithGeneralTitles = 
        allGroupsEntriesData.map(entry => addGeneralTitleToGroupLessons(entry.title, entry.lessons));
    const aggregatedGroupsLessons = allGroupsEntriesWithGeneralTitles.flat();

    return aggregatedGroupsLessons;
}

export function addGeneralTitleToGroupLessons(title, lessons) {
    const lessonsWithTitle = lessons.map(lesson => Object.create({ ...lesson, title }));

    return lessonsWithTitle;
}
