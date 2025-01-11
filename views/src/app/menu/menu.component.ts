import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Book } from '../models/book.models';
import { Chapter } from '../models/chapter.models';
import { faEllipsisVertical, faPlus, faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';

enum MenuType { 
  'book',
  'chapter'
};

interface MenuOptions {
  icon: IconDefinition;
  title: string;
  routeLink: string;
  click: any,
  enabled: boolean;
  value: string
}

@Component({
  selector: 'app-menu',
  imports: [ FontAwesomeModule, NgIf, NgClass, NgFor ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  currentItemMenu: Book | Chapter | null = null;
  menuType: MenuType = MenuType.book;
  
  @Input() item: Book | Chapter = {} as Book; 
  @Input() noBackground: boolean = false;
  @Input() difference20: boolean = false;
  @Input() differenceTop0: boolean = false;
  @Input() paddingTop0: boolean = false;
  @Input() callback: Function = () => {};
  @Input() type: string = "";


  menuOptions: MenuOptions[] = [
    {
      icon: faPlus,
      title: "New {menuType}",
      routeLink: `/{menuType}/{itemId}/new/chapter`,
      click: null,
      enabled: true,
      value: "new"
    },
    {
      icon: faPenNib,
      title: "Edit {menuType}",
      routeLink: `/{menuType}/{itemId}/update`,
      click: null,
      enabled: true,
      value: "edit"
    }, 
    {
      icon: faTrash,
      title: "Delete {menuType}",
      routeLink: '',
      click: () => this.deleteItem(this.item.id),
      enabled: true,
      value: "delete"
    }
  ];

  faEllipsisVertical = faEllipsisVertical;
  faPlus = faPlus;
  faTrash = faTrash;
  faPenNib = faPenNib;


  constructor(
    private readonly http: HttpClient, 
    private readonly toastr: ToastrService,
    private readonly router: Router
  ) {};

  ngOnInit(): void {
    this.addMenuType()
  };

  addMenuType(): void {
    if(this.type == "chapter") this.menuType = MenuType.chapter;
    if(this.type == "book") this.menuType = MenuType.book;

    this.menuOptions = this.menuOptions.map((item: MenuOptions) => {
      item.title = item.title.replaceAll("{menuType}", MenuType[this.menuType]);
      item.routeLink = item.routeLink.replaceAll("{menuType}", MenuType[this.menuType]).replaceAll("{itemId}", this.item.id);

      if(item.value == "new" && this.type == "chapter") item.enabled = false;

      return item;
    });
  };

  toggleMenu(event: Event, item: Book | Chapter): void {
    event.stopImmediatePropagation();

    item.openMenu = !item.openMenu;
    this.currentItemMenu = item;

    if(!item.openMenu) this.currentItemMenu = null;
  };

  deleteItem(id: string): void {
    const url = MenuType[this.menuType] == "book" ? "/api/book" : "/api/chapter";

    this.http.delete(url, { body: { id: id } }).subscribe({
      next: () => {
        this.toastr.success(this.menuType + " was deleted with success!","Success!", {
          "closeButton": true,
        });
        this.callback();
      },

      error: (_error) => {
        this.toastr.error("It was not possible to delete " + this.menuType,"Ops! Something happened!", {
          "closeButton": true,
        });
      }
    });
  };

  optionAction(option:MenuOptions): void {
    if(!option.routeLink) return option.click();

    this.router.navigate([option.routeLink]);

  };
};
