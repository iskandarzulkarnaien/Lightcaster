// This is the object that all other objects inherit from.
// This is to ensure all objects have a #hit function and can have special properties.

class BaseObject {
    ALLOWED_OPTICAL_PROPERTIES = new Set(['reflective', 'transparent', 'translucent']);

    constructor() {
        this.optical_properties = [];
    }

    addOpticalProperty(property) {
        if (!this.ALLOWED_OPTICAL_PROPERTIES.has(property)) {
            throw `Attempting to add forbidden property: ${property}`
        }
        this.optical_properties.push(property)
    }

    addOpticalProperties(properties) {
        if (typeof(properties) == 'string') {
            throw "Check that properties is an array and not a string!"
        }
        for (let property of properties) {
            this.addOpticalProperty(property);
        }
    }

    receiveHit() {
        return; // Not all objects need to react when they are hit
    }

    findHit() {
        throw "Invoking BaseObject's #findHit(). Ensure that subclass has implemented this function!"
    }
}