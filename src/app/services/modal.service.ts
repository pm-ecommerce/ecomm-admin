import { Injectable, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Injectable({ providedIn: 'root' })
export class ModalService {
    private instances: Array<BsModalRef>;

    constructor(private service: BsModalService) {
        this.instances = [];
    }

    public open(template: TemplateRef<any>, size = 'modal-md'): BsModalRef {
        const config: ModalOptions = { class: size, ignoreBackdropClick: true, keyboard: false, backdrop: 'static' };
        const instance: BsModalRef = this.service.show(template, config);
        this.instances.push(instance);
        return instance;
    }

    public openWithComponent(component: any, data: any = null) {
        if (!data) {
            // tslint:disable-next-line:no-shadowed-variable
            const instance: BsModalRef = this.service.show(component);
            this.instances.push(instance);
            return instance;
        }

        const instance: BsModalRef = this.service.show(component, { initialState: data });
        this.instances.push(instance);
        return instance;
    }

    public close(reason: any = null) {
        const instance = this.instances.pop();
        instance.hide();
        return null;
    }

    public hasInstances() {
        return this.instances.length > 0;
    }
}
