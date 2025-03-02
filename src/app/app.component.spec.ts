import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { By } from '@angular/platform-browser';
import { ExchangeRateService } from './services/services/exchange-rate.service';
import { ToastrService } from 'ngx-toastr';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let toastrService: jest.Mocked<ToastrService>;
  let exchangeRateService: jest.Mocked<ExchangeRateService>;

  beforeEach(async () => {
    toastrService = {
      info: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    exchangeRateService = {
      getTimeSeries: jest.fn().mockReturnValue(of([])), // Return an observable
      getLatestRates: jest.fn().mockReturnValue(of([])), // Return an observable
    } as unknown as jest.Mocked<ExchangeRateService>;

    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      declarations: [AppComponent, DashboardComponent],
      providers: [
        { provide: ExchangeRateService, useValue: exchangeRateService },
        { provide: ToastrService, useValue: toastrService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'exchange-dashboard'`, () => {
    expect(component.title).toEqual('exchange-dashboard');
  });

  it('should render the dashboard component', () => {
    fixture.detectChanges();
    const dashboardElement = fixture.debugElement.query(
      By.directive(DashboardComponent)
    );
    expect(dashboardElement).toBeTruthy();
  });
});
