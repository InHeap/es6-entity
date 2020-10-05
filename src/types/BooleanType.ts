import Field from '../sql/Field';

class BooleanType extends Field<boolean> {

	constructor(data?: boolean) {
		super();
		this.set(data);

		return new Proxy(this, {
			get(target, prop) {
				if (prop in target) {
					return target[prop];
				} else if (target._value) {
					return target._value[prop];
				}
			},
			getPrototypeOf() {
				return BooleanType.prototype;
			}
		});

	}

	set(value: boolean | Boolean) {
		if (value == null || value == undefined) {
			super.set(null);
		} else if (typeof value == 'boolean' || value instanceof Boolean) {
			super.set(<boolean>value);
		} else {
			super.set(value ? true : false);
		}
	}

}

export default BooleanType;
