import { Component, OnInit, Input } from '@angular/core';
import { CatalogItem } from '../../shared/catalog-item';
import { MatDialog } from '@angular/material';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserSettingsService } from '../../shared/user-settings.service';
import { CatalogService } from '../../shared/catalog.service';
import { AppRoles } from '../../shared/user-settings';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent implements OnInit {
  @Input() catalogItem: CatalogItem;
  @Input() disabled: boolean;

  /**
   * True if item is liked by user.
   */
  public liked: boolean;

  constructor(
    private userSettings: UserSettingsService,
    private loginDialog: MatDialog,
    private catalogService: CatalogService
  ) { }

  ngOnInit() {
    this.userSettings.getUserSettings().subscribe( user => {
      this.liked = this.checkItemLiked(user.name);
    });
  }

  private checkItemLiked(userName: string): boolean {
    if (this.catalogItem.likes.indexOf(userName) >= 0) {
      return true;
    } else {
      return false;
    }
  }

  like(): void {
    if (this.userSettings.role === AppRoles.guest) {
      this.loginDialog.open(UserLoginComponent, {
        width: '250px',
        height: 'auto'
      }).afterClosed().subscribe(loggedIn => {
        if (loggedIn) {
          this.catalogService.like(this.catalogItem.id).subscribe(
            (result: number) => this.setLike(result));
        }
      });
    } else {
      this.catalogService.like(this.catalogItem.id).subscribe(
        (result: number) => this.setLike(result));
    }
  }

  /**
   * Set like icon.
   * @param like "1" - liked, "-1" - disliked, "0" - not changed
   */
  setLike(like: number) {
    if (like > 0) {
      this.liked = true;
    } else if (like < 0) {
      this.liked = false;
    }
  }

}
