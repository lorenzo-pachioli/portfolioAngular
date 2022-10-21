import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from '@ngx-translate/core';
import { TranslateServiceMock } from 'src/app/test/mocks/services/translate.service.mock';
import { CardListComponent } from './card-list.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientServiceMock } from 'src/app/test/mocks/services/http-client.service.mock';
import { CoreModule } from 'src/app/modules/core/core.module';

describe('CardListComponent', () => {
	let component: CardListComponent;
	let fixture: ComponentFixture<CardListComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				CoreModule
			],
			declarations: [CardListComponent],
			providers: [
				{
					provide: TranslateService,
					useClass: TranslateServiceMock
				},
				{
					provide: HttpClient,
					useClass: HttpClientServiceMock
				}
			]
		})
			.compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CardListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
