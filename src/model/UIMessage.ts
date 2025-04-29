export enum UIMessageType {
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error'
}

export abstract class UIMessage {
    abstract readonly type: UIMessageType;
    readonly message: string;

    protected constructor(message: string) {
        this.message = message;
    }
}

export class SuccessUIMessage extends UIMessage {
    readonly type: UIMessageType = UIMessageType.SUCCESS;

    constructor(message: string) {
        super(message);
    }
}

export class WarningUIMessage extends UIMessage {
    readonly type: UIMessageType = UIMessageType.WARNING;

    constructor(message: string) {
        super(message);
    }
}

export class ErrorUIMessage extends UIMessage {
    readonly type: UIMessageType = UIMessageType.ERROR;

    constructor(message: string) {
        super(message);
    }
}
