import { createSelector } from "reselect";

const selectDirectory = state => state.directory

export const selectSections = createSelector(
    [selectDirectory],
    sections => sections.sections
)