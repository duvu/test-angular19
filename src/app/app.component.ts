import { Component, OnInit, OnDestroy, Renderer2, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import * as ThemeActions from './core/store/theme/theme.actions';
import { selectIsDarkMode } from './core/store/theme/theme.selectors';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatSlideToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  isScrolled = false;
  private destroy$ = new Subject<void>();
  private scrollThreshold = 50;

  constructor(
    private store: Store,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      this.isScrolled = scrollPosition > this.scrollThreshold;
    }
  }

  ngOnInit(): void {
    // Initialize theme
    this.store.dispatch(ThemeActions.loadThemePreference());
    
    // Subscribe to theme changes
    if (isPlatformBrowser(this.platformId)) {
      this.store.select(selectIsDarkMode)
        .pipe(takeUntil(this.destroy$))
        .subscribe(isDarkMode => {
          this.isDarkMode = isDarkMode;
          this.applyTheme(isDarkMode);
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleTheme(): void {
    this.store.dispatch(ThemeActions.toggleTheme({ isDarkMode: !this.isDarkMode }));
  }

  private applyTheme(isDarkMode: boolean): void {
    const htmlElement = this.document.documentElement;
    if (isDarkMode) {
      this.renderer.addClass(htmlElement, 'dark-theme');
      this.renderer.removeClass(htmlElement, 'light-theme');
    } else {
      this.renderer.addClass(htmlElement, 'light-theme');
      this.renderer.removeClass(htmlElement, 'dark-theme');
    }
  }
} 