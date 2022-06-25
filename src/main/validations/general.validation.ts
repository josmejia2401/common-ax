export class GeneralValidation {

    static isEmpty(value: any) {
        if (value === undefined || value === null || value === "") {
            return true;
        }
        if (Array.isArray(value) === true) {
            return value.length === 0;
        }
        return false;
    }
}
