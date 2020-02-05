import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: 'u-side-drawer',
    styleUrl: './side-drawer.styl',
    /*
    * shadow: true - для работы в старых браузерах с shadow DOM будут добавлены полифилы
    * scoped: true - эмуляция shadow DOM
    */
    shadow: true,
})
export class SideDrawer {

    /*
    *@Prop({reflect: true}) - компонент будет обновляться, когда будет обновляться значение атрибута
    */
    @Prop({ 
        reflect: true,
        attribute: 'title' 
    }) itemTitle: string;

    // @Prop() open: boolean = true;

    render() {
        // let content = null;
        // if(this.open) {
        //     content = (
        //         <aside>
        //             <header class="header">
        //                  <h2 class="header__title">
        //                      { this.itemTitle }
        //                  </h2>
        //             </header>
        //             <main>
        //                 <slot>test</slot>
        //             </main>
        //         </aside>
        //     );
        // }

        return (
            <aside class="aside">
                <header class="header">
                     <h2 class="header__title">
                         { this.itemTitle }
                     </h2>
                </header>
                <main>
                    <slot>test</slot>
                </main>
            </aside>
        );;
    }
}