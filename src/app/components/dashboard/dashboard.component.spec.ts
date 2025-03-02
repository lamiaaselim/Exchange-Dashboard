import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { ExchangeRateService } from '../../services/services/exchange-rate.service';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let toastrService: jest.Mocked<ToastrService>;
  let exchangeRateService: jest.Mocked<ExchangeRateService>;

  beforeEach(async () => {
    toastrService = {
      info: jest.fn(),
      warning: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    exchangeRateService = {
      getTimeSeries: jest
        .fn()
        .mockReturnValue(of({ rates: { '2024-02-01': { EUR: 0.85 } } })),
      getLatestRates: jest
        .fn()
        .mockReturnValue(of({ rates: { USD: 1, EUR: 0.85, GBP: 0.75 } })),
    } as unknown as jest.Mocked<ExchangeRateService>;

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DashboardComponent],
      providers: [
        { provide: ToastrService, useValue: toastrService },
        { provide: ExchangeRateService, useValue: exchangeRateService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should show a toast when toggling edit mode', () => {
    component.toggleEditMode();
    expect(toastrService.info).toHaveBeenCalledWith(
      'Edit mode enabled',
      'Feedback'
    );

    component.toggleEditMode();
    expect(toastrService.info).toHaveBeenCalledWith(
      'View mode enabled',
      'Feedback'
    );
  });

  it('should prevent hiding the last visible chart and show a warning toast', () => {
    component.showLineChart = false;
    component.showBarChart = true;

    component.toggleChart('barChart');

    expect(toastrService.warning).toHaveBeenCalledWith(
      'At least one chart must be visible',
      'Feedback'
    );
  });

  it('should show a toast when toggling a chart', () => {
    component.toggleChart('lineChart');
    expect(toastrService.info).toHaveBeenCalledWith(
      'Line Chart hidden',
      'Feedback'
    );

    component.toggleChart('lineChart');
    expect(toastrService.info).toHaveBeenCalledWith(
      'Line Chart added',
      'Feedback'
    );
  });
});
